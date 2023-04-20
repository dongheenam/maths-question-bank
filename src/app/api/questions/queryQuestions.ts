import { Filter } from 'mongodb';

import {
  QuestionQuery,
  QuestionServer,
  questionQuerySchema,
} from '@/app/questions/types';
import client, { getCollection } from '@/common/server/mongoClient';

const queryQuestions = async (query: QuestionQuery) => {
  const { topic, yearLevel, tags, text } = questionQuerySchema.parse(query);
  const questionsCollection = getCollection<QuestionServer>(
    client,
    'questions'
  );
  const filter: Filter<QuestionServer> = {};

  if (topic) {
    filter.topic = topic;
  }
  if (yearLevel) {
    filter.yearLevel = yearLevel;
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
