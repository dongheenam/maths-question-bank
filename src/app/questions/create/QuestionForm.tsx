'use client';

import { useReducer } from 'react';
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
  } else if ('loading' in next && next.loading === true) {
    return { ...prev, ...next, error: null, created_id: null };
  } else {
    return { ...prev, ...next };
  }
};

const QuestionForm = () => {
  const [formState, updateFormState] = useReducer(formUpdater, INITIAL_STATE);
  const [formStatus, updateFormStatus] = useReducer(statusUpdater, {
    loading: false,
    error: null,
    created_id: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormStatus({ loading: true });
    const { tags } = formState;
    const uniqueTags = [...new Set(tags.map((tag) => tag.trim()))];
    try {
      if (formState.problem.trim() === '' || formState.solution.trim() === '') {
        throw new Error('Problem and solution cannot be empty!');
      }

      console.log('sending form...');
      const _id = await postQuestion({ ...formState, tags: uniqueTags });
      console.log('received response!');
      updateFormState({
        tags: [],
        problem: '',
        solution: '',
      });
      updateFormStatus({ created_id: _id });
    } catch (error: any) {
      console.error('Error creating question:', error);
      updateFormStatus({ error: 'Error creating question - ' + error.message });
    }
  };

  let statusMessage = '';
  if (formStatus.loading) {
    statusMessage = 'Submitted! Waiting for response...';
  } else if (formStatus.error) {
    statusMessage = formStatus.error;
  } else if (formStatus.created_id) {
    statusMessage = `Question created with id: ${formStatus.created_id}`;
  } else {
    statusMessage = 'Waiting for form submission...';
  }
  return (
    <div>
      <span>Form status: {statusMessage}</span>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Topic</span>
          <select
            value={formState.topic}
            onChange={(e) =>
              updateFormState({ topic: e.target.value as Topic })
            }
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
    </div>
  );
};
export default QuestionForm;
