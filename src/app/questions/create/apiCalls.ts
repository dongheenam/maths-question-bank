import { Question } from '../types';

type QuestionData = Omit<Question, '_id' | 'tags'> & {
  tags: string[];
};

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
  let data: { _id: string };

  if (!response.ok) {
    throw new Error("Server error, couldn't post question.");
  }
  data = await response.json();
  return data._id;
};
