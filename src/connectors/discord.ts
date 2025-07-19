import { configurationContainer } from '../configurationContainer';
import { createSlackService } from '../services/createSlackService';

export async function runDiscord(context: any, config: any) {
  try {
    const message = `Hi ${context.leadName}, here's what we found: ${JSON.stringify(context.insights, null, 2)}`;
    const slackService = createSlackService();
    await slackService.sendAMessageToAChannel({ message, channel: configurationContainer.SLACK_MESSAGE_CHANNEL_ID });
    return { ...context, messageSent: 'success' };
  } catch (err) {
    console.error('Error sending message to slack:-', err);
    return { ...context, messageSent: 'failed' };
  }
}
