'use client';

import { useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Question,
  TOPICS,
  Topic,
  YEAR_LEVELS,
  YearLevel,
  questionSchema,
} from '../types';
import MultiTextInput from '../../../common/components/MultiTextInput';
import { patchQuestion } from '../create/apiCalls';

type Props = {
  question: Question & { _id: string };
};

const partialFormSchema = questionSchema.partial();
const formUpdater = (prev: Question, next: Partial<Question>) => {
  const updates = partialFormSchema.parse(next);
  return { ...prev, ...updates };
};

type FormStatus = {
  opened: boolean;
  loading: boolean;
  error: string | null;
};
const statusUpdater = (prev: FormStatus, next: Partial<FormStatus>) => {
  if ('error' in next) {
    return { ...prev, ...next, loading: false };
  } else if (next.loading === true) {
    return { ...prev, ...next, error: null };
  } else {
    return { ...prev, ...next };
  }
};

const EditForm = ({ question }: Props) => {
  const router = useRouter();
  const [formState, updateFormState] = useReducer(formUpdater, question);
  const [formStatus, updateFormStatus] = useReducer(statusUpdater, {
    opened: false,
    loading: false,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormStatus({ loading: true });

    try {
      const questionData = questionSchema.parse(formState);
      await patchQuestion({ ...questionData, _id: question._id });

      updateFormStatus({ loading: false });
      updateFormStatus({ opened: false });
      router.refresh();
    } catch (error: any) {
      updateFormStatus({ error: 'Error editing question - ' + error.message });
    }
  };

  if (!formStatus.opened) {
    return (
      <button onClick={() => updateFormStatus({ opened: true })}>
        Open form
      </button>
    );
  }

  let statusMessage = '';
  if (formStatus.loading) {
    statusMessage = 'Submitted! Waiting for response...';
  } else if (formStatus.error) {
    statusMessage = formStatus.error;
  } else {
    statusMessage = 'Waiting for submission...';
  }
  return (
    <div>
      <button onClick={() => updateFormStatus({ opened: false })}>
        Close form
      </button>
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
        <button type="submit">Save</button>
      </form>
      <span>Form status: {statusMessage}</span>
    </div>
  );
};
export default EditForm;
