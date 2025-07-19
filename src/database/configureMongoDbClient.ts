import { MongoClient } from 'mongodb';
import { createWorkFlowResultsTable } from './createWorkFlowResultsTable';

export const configureMongoDbClient = async ({ uri, collectionName }: { uri: string, collectionName: string }) => {
  const mongoDbClient = await MongoClient.connect(uri);
  await createWorkFlowResultsTable({ client: mongoDbClient, collectionName });
  return mongoDbClient;
}
