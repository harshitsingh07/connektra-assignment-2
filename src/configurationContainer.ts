import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const environmentSchema = z.object({
  TZ: z.string().refine((val) => val === 'UTC', { message: 'TZ must be "UTC".' }),
  PORT: z.string().transform(Number),
  OPENAI_API_KEY: z.string(),
  MONGO_DB_URL: z.string(),
  SLACK_TOKEN: z.string(),
  SLACK_MESSAGE_CHANNEL_ID: z.string(),
}).strip();

type TConfiguration = z.infer<typeof environmentSchema>

const createConfigurationContainer = (source: NodeJS.ProcessEnv): TConfiguration => {
  const parsedEnv = environmentSchema.parse(source);
  return parsedEnv;
};

export const configurationContainer = createConfigurationContainer(process.env);
