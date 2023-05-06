import { Filter } from 'mongodb';

import {
  QuestionQuery,
  Question,
  questionQuerySchema,
} from '@/app/questions/types';
import client, { getCollection } from '@/common/server/mongoClient';

const queryQuestions = async (query: QuestionQuery) => {
  const { topic, yearLevel, tags, text, isExtension } =
    questionQuerySchema.parse(query);
  const questionsCollection = getCollection<Question>(client, 'questions');
  const filter: Filter<Question> = {};

  if (topic) {
    filter.topic = topic;
  }
  if (yearLevel) {
    filter.yearLevel = yearLevel;
  }
  if (isExtension) {
    filter.isExtension = isExtension;
  }
  if (tags) {
    filter.tags = { $in: tags };
  }
  if (text) {
    filter.$text = { $search: text };
  }

  const questions = await questionsCollection.find(filter).toArray();
  return questions;
};
export default queryQuestions;
