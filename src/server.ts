import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { configurationContainer } from '../src/configurationContainer';
import { workflowBodyValidator } from './middlewares/workflowBodyValidator';
import { executeWorkflow } from './workflowEngine';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.post('/api/execute', workflowBodyValidator, async (req, res) => {
  const { workflowDefinition } = req.body;
  try {
    const result = await executeWorkflow(workflowDefinition);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Workflow execution failed' });
  }
});

app.listen(configurationContainer.PORT, () => console.log(`Backend running on port ${configurationContainer.PORT}`));
