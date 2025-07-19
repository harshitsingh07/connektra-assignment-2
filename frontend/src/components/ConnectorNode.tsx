import React from 'react';

export default function ConnectorNode({ data }: any) {
  return (
    <div style={{ padding: 10, background: '#dbeafe', borderRadius: 5 }}>
      <strong>{data.label}</strong>
    </div>
  );
}
