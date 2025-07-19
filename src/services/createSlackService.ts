import { configurationContainer } from "../configurationContainer";
import { WebClient } from '@slack/web-api';

export const createSlackService = () => {
  return {
    sendAMessageToAChannel: async ({ message, channel }: { message: string; channel: string }) => {
      const token = configurationContainer.SLACK_TOKEN;
      const web = new WebClient(token);
      return await web.chat.postMessage({
        markdown: true,
        channel,
        text: message,
      });
    }
  };
};