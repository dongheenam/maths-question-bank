import { QuestionWithId, QuestionWithObjectId } from '@/app/questions/types';
import client, { getCollection } from '@/common/server/mongoClient';
import { ObjectId } from 'mongodb';

const editQuestion = async (
  questionWithId: QuestionWithId | QuestionWithObjectId
): Promise<void> => {
  const { _id, ...question } = questionWithId;
  const { tags } = question;
  const questionId = new ObjectId(_id);

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      const { matchedCount } = await getCollection(
        client,
        'questions'
      ).updateOne({ _id: questionId }, { $set: question });
      if (matchedCount === 0) {
        throw new Error("Question doesn't exist.");
      }

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
    });
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await session.endSession();
  }
};
export default editQuestion;
