import { Question } from '@/app/questions/types';
import client, { getCollection } from '@/common/server/mongoClient';
import { ObjectId } from 'mongodb';

const getQuestion = async (_id: string) => {
  const question = await getCollection<Question>(client, 'questions').findOne({
    _id: new ObjectId(_id),
  });
  return question;
};
export default getQuestion;
