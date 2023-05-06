import { Question, QuestionWithId } from './types';

export const postQuestion = async (questionData: Question): Promise<string> => {
  const { topic, yearLevel, tags, problem, solution, reference, isExtension } =
    questionData;
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
      reference,
      isExtension,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`server error: ${data.error}`);
  }
  return data._id;
};

export const patchQuestion = async (
  questionData: QuestionWithId
): Promise<void> => {
  const {
    _id,
    topic,
    yearLevel,
    tags,
    problem,
    solution,
    isExtension,
    reference,
  } = questionData;
  const response = await fetch(`/api/questions/${_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      yearLevel,
      tags,
      problem,
      solution,
      isExtension,
      reference,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(`server error: ${data.error}`);
  }
};
