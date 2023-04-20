'use client';

import { useReducer } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  QuestionQuery,
  TOPICS,
  Topic,
  YEAR_LEVELS,
  YearLevel,
  questionQuerySchema,
} from './types';
import MultiTextInput from '@/common/components/MultiTextInput';
import { z } from 'zod';

const searchFormSchema = questionQuerySchema.required();
type SearchFormState = z.infer<typeof searchFormSchema>;
type Props = {
  query: QuestionQuery;
};
const INITIAL_STATE: SearchFormState = {
  topic: 'Number',
  yearLevel: '7',
  tags: [],
  text: '',
};

const updater = (prev: SearchFormState, next: Partial<SearchFormState>) => {
  try {
    const updates = questionQuerySchema.parse(next);
    return { ...prev, ...updates };
  } catch (error) {
    console.error(error);
    return prev;
  }
};

const SearchForm = ({ query }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [formState, updateFormState] = useReducer(
    updater,
    updater(INITIAL_STATE, query)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const searchQuery = searchFormSchema
        .transform((query) => ({
          ...query,
          tags: query.tags.map((tag) => tag.trim()),
        }))
        .parse(formState);

      const { tags: tagQuery, ...rest } = searchQuery;
      const searchParams = new URLSearchParams(rest);
      for (const tag of tagQuery) {
        searchParams.append('tags', tag);
      }
      router.push(`${pathname}?${searchParams.toString()}`);
    } catch (error: any) {
      console.error('Error submitting search form:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic">Topic:</label>
        <select
          id="topic"
          value={formState.topic}
          onChange={(e) =>
            updateFormState({
              topic: e.target.value as Topic,
            })
          }
        >
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <label>
          <span>Year</span>
          <select
            value={formState.yearLevel}
            onChange={(e) =>
              updateFormState({ yearLevel: e.target.value as YearLevel })
            }
          >
            {YEAR_LEVELS.map((yearLevel) => (
              <option key={yearLevel} value={yearLevel}>
                {yearLevel}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span>Tags</span>
          <MultiTextInput
            value={formState.tags}
            setValue={(value) => updateFormState({ tags: value })}
          />
        </div>
        <label htmlFor="search-text">Search text:</label>
        <input
          id="search-text"
          type="text"
          value={formState.text}
          onChange={(e) => updateFormState({ text: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>
      <code>current state: {JSON.stringify(formState)}</code>
    </>
  );
};
export default SearchForm;
