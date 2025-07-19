import { configurationContainer } from '../configurationContainer';
import { configureMongoDbClient } from '../database/configureMongoDbClient';

const insertEntryInMongoDb = async (entry: any, dbCollectionName: string) => {
  const mongoDbClient = await configureMongoDbClient({ uri: configurationContainer.MONGO_DB_URL, collectionName: dbCollectionName });
  const workflowResultsCollection = mongoDbClient.db().collection(dbCollectionName);
  workflowResultsCollection.insertOne(entry);
}

export async function runMongoDB(context: any, config: any) {
  try {
    const entry = {
      lead: context.leadName,
      company: context.companyInfo.name,
      insights: context.insights
    };
    const dbCollectionName = config.collection_name as string;
    await insertEntryInMongoDb(entry, dbCollectionName);
    console.log('Successfully entered data to Mongo DB');
    return { ...context, database_entry: 'success' };
  } catch (err) {
    console.error('Error pushing data to Mongo DB', err);
    return { ...context, database_entry: 'failed' };
  }
}
