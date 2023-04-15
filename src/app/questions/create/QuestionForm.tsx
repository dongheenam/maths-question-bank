'use client';

import { useReducer, useState } from 'react';
import { Question, TOPICS, Topic, YEAR_LEVELS, YearLevel } from '../types';
import MultiTextInput from './MultiTextInput';
import { postQuestion } from './apiCalls';

type FormState = Omit<Question, '_id' | 'tags'> & {
  tags: string[];
};
const INITIAL_STATE: FormState = {
  topic: 'Number',
  yearLevel: '7',
  tags: [],
  problem: '',
  solution: '',
};
const formUpdater = (prev: FormState, next: Partial<FormState>) => {
  const updates = { ...next };
  // TODO: Validate updates
  return { ...prev, ...updates };
};

type FormStatus = {
  loading: boolean;
  error: string | null;
  created_id: string | null;
};
const statusUpdater = (prev: FormStatus, next: Partial<FormStatus>) => {
  if ('error' in next) {
    return { ...prev, ...next, loading: false };
  } else if ('created_id' in next) {
    return { ...prev, ...next, loading: false };
  } else {
    return { ...prev, ...next };
  }
};

const QuestionForm = () => {
  const [formState, updateFormState] = useReducer(formUpdater, INITIAL_STATE);
  const [formStatus, setFormStatus] = useReducer(statusUpdater, {
    loading: false,
    error: null,
    created_id: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { tags } = formState;
    const uniqueTags = [...new Set(tags.map((tag) => tag.trim()))];
    try {
      const _id = await postQuestion({ ...formState, tags: uniqueTags });
      updateFormState({
        tags: [],
        problem: '',
        solution: '',
      });
      setFormStatus({ created_id: _id });
    } catch (error: any) {
      console.error('Error creating question:', error);
      setFormStatus({ error: error.message });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Topic</span>
        <select
          value={formState.topic}
          onChange={(e) => updateFormState({ topic: e.target.value as Topic })}
        >
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
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
      <div>
        <label>
          <span>Problem</span>
          <textarea
            value={formState.problem}
            onChange={(e) => updateFormState({ problem: e.target.value })}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Solution</span>
          <textarea
            value={formState.solution}
            onChange={(e) => updateFormState({ solution: e.target.value })}
          />
        </label>
      </div>
      <button type="submit">Create Question</button>
    </form>
  );
};
export default QuestionForm;
