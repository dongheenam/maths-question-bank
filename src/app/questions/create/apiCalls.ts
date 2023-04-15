import { Question } from '../types';

type QuestionData = Omit<Question, '_id'>;

export const postQuestion = async (
  questionData: QuestionData
): Promise<string> => {
  const { topic, yearLevel, tags, problem, solution } = questionData;
  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      yearLevel,
      tags,
      problem,
      solution,
    }),
  });

  if (!response.ok) {
    throw new Error("Server error, couldn't post question.");
  }
  const data = (await response.json()) as { _id: string };
  return data._id;
};
