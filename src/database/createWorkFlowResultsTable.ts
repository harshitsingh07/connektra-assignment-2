import { MongoClient, MongoError } from "mongodb";

export const createWorkFlowResultsTable = async ({ client, collectionName }: { client: MongoClient, collectionName: string }) => {
  const collections = await client.db().listCollections().toArray();
  const collectionNames = collections.map(({ name }) => name);

  if (!collectionNames.includes(collectionName)) {
    try {
      await client.db().createCollection(collectionName);
    } catch (error) {
      const errorMessage = (error as MongoError).message;
      if (errorMessage.includes('Collection already exists. NS:') && errorMessage.includes(collectionName)) throw error;
    }
  }
}