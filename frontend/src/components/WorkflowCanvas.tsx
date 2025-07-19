import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
} from "react-flow-renderer";
import ConnectorNode from "./ConnectorNode";
import ConfigurationModal, { TConfig } from "./ConfigurationModal";
import { connectorTypes } from "../utils/constants";
import axios from "axios";

const backendPort = 1234;
const backendUrl = `http://localhost:${backendPort}`;

type TWorkFlow = {
  type: string;
  config: TConfig;
};

const nodeTypes = { connectorNode: ConnectorNode };

const initialNodes = connectorTypes.map((type, idx) => ({
  id: type,
  type: "connectorNode",
  position: { x: 100, y: idx * 100 },
  data: { label: type },
}));

const initialEdges: Edge[] = connectorTypes.slice(1).map((type, i) => ({
  id: `e${connectorTypes[i]}-${type}`,
  source: connectorTypes[i],
  target: type,
}));

export default function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [config, setConfig] = useState<Record<string, any>>({});

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleRun = async () => {
    const workflow: TWorkFlow[] = nodes.map((n) => ({
      type: n.id,
      config: config[n.id] || {},
    }));
    const res = await axios.post(`${backendUrl}/api/execute`, {
      workflowDefinition: workflow,
    });
    alert(JSON.stringify(res.data.result, null, 2));
  };

  return (
    <div>
      <ConfigurationModal
        node={selectedNode}
        config={config}
        setConfig={setConfig}
      />
      <button onClick={handleRun}>Run Workflow</button>
      <div
        className="react-flow-wrapper"
        style={{ height: "80vh", marginTop: 10 }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNode(node)}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}
