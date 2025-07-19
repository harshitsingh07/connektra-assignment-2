import { z } from "zod";

export enum EConnectorType {
  GOOGLE_FORM = 'googleForm',
  WEB_CRAPPER = 'webScraper',
  AI_ASSISTANT = 'aiAssistant',
  MONGO_DB = 'mongoDB',
  DISCORD = 'discord'
}

const WorkflowEngineSchema = z.array(
  z.object({
    type: z.nativeEnum(EConnectorType),
    config: z.record(z.string()),
  })
);
export type TWorkflowEngine = z.infer<typeof WorkflowEngineSchema>;

export const WorkflowPayloadSchema = z.object({ workflowDefinition: WorkflowEngineSchema });
export type TWorkflowPayload = z.infer<typeof WorkflowPayloadSchema>;
