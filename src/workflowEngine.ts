import { runAIAssistant } from './connectors/aiAssistant';
import { runDiscord } from './connectors/discord';
import { runGoogleForm } from './connectors/googleForm';
import { runMongoDB } from './connectors/mongoDB';
import { runWebScraper } from './connectors/webScraper';
import { EConnectorType, TWorkflowEngine } from './schemas/workflow';

export async function executeWorkflow(workflow: TWorkflowEngine) {
  let context: any = {};
  for (const step of workflow) {
    switch (step.type) {
      case EConnectorType.GOOGLE_FORM:
        context = await runGoogleForm(step.config);
        break;
      case EConnectorType.WEB_CRAPPER:
        context = await runWebScraper(context, step.config);
        break;
      case EConnectorType.AI_ASSISTANT:
        context = await runAIAssistant(context, step.config);
        break;
      case EConnectorType.MONGO_DB:
        context = await runMongoDB(context, step.config);
        break;
      case EConnectorType.DISCORD:
        context = await runDiscord(context, step.config);
        break;
    }
  }
  return context;
}
