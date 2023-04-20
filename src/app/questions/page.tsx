import Link from 'next/link';
import { z } from 'zod';

import SearchForm from './SearchForm';
import queryQuestions from '../api/questions/queryQuestions';
import { QuestionQuery, QuestionServer, questionQuerySchema } from './types';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const parseSearchParams = (searchParams: Props['searchParams']) => {
  const { tags, ...query } = searchParams;
  if (tags) {
    query.tags = new Array(tags).flat();
  }
  return questionQuerySchema.parse(query);
};

export default async function Page({ searchParams }: Props) {
  let query: QuestionQuery = {};
  try {
    query = parseSearchParams(searchParams);
  } catch (error) {
    if (error instanceof z.ZodError && Object.keys(searchParams).length > 0) {
      console.error(error);
    }
  }

  let questions: QuestionServer[] = [];
  try {
    questions = await queryQuestions(query);
  } catch (error) {
    console.error(error);
  }
  return (
    <main>
      <h1>Questions</h1>
      <Link href="/questions/create">Create new question</Link>
      <h2>Search</h2>
      <SearchForm query={query} />
      <ul>
        {questions.map((question) => (
          <li key={question._id.toHexString()}>
            <Link href={`/questions/${question._id}`}>{question.problem}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
