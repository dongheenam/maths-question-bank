import { Question } from '@/app/questions/types';
import client, { getCollection } from '@/common/server/mongoClient';
import { ObjectId } from 'mongodb';

type QuestionData = Omit<Question, '_id'>;
const createQuestion = async (
  questionData: QuestionData
): Promise<ObjectId | null> => {
  const { tags } = questionData;
  let _id: ObjectId | null = null;

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      const { insertedId } = await getCollection(client, 'questions').insertOne(
        questionData
      );

      const upsertTags = tags.map((tag) => ({
        updateOne: {
          filter: { name: tag },
          update: { $set: { name: tag } },
          upsert: true,
        },
      }));
      if (upsertTags.length > 0) {
        await getCollection(client, 'tags').bulkWrite(upsertTags);
      }

      _id = insertedId;
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await session.endSession();
  }

  return _id;
};
export default createQuestion;
