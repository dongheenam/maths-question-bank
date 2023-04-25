import Link from 'next/link';
import { z } from 'zod';

import SearchForm from './SearchForm';
import queryQuestions from '../api/questions/queryQuestions';
import { QuestionQuery, QuestionServer, questionQuerySchema } from './types';
import { redirect } from 'next/navigation';
import Markdown from '@/common/components/Markdown';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const parseSearchParams = (searchParams: Props['searchParams']) => {
  const { topic, yearLevel, tags, text } = searchParams;
  const parsed: Props['searchParams'] = {};
  if (topic) parsed.topic = topic;
  if (yearLevel) parsed.yearLevel = yearLevel;
  if (text) parsed.text = text;
  if (tags) {
    // converts string | string[] to string[]
    parsed.tags = new Array(tags).flat();
  }
  return questionQuerySchema.parse(parsed);
};

export default async function Page({ searchParams }: Props) {
  let query: QuestionQuery = {};
  try {
    query = parseSearchParams(searchParams);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error);
      if (Object.keys(searchParams).length > 0) {
        redirect('/questions');
      }
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
            <Link href={`/questions/${question._id}`}>
              <Markdown text={question.problem} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
