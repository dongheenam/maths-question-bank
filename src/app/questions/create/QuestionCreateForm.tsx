'use client';

import { useReducer } from 'react';
import { Question, questionSchema, trimQuestion } from '../types';
import { postQuestion } from '../apiCalls';
import {
  ExtensionForm,
  MarkdownForm,
  TagsForm,
  TopicForm,
  YearLevelForm,
} from '../FormComponents';
import TextInput from '@/common/components/TextInput';
import FormStatus, { useFormStatus } from '@/common/components/FormStatus';
import zodErrorParser from '@/common/zodErrorParser';

type FormState = Omit<Question, '_id'>;
const INITIAL_STATE: FormState = {
  topic: 'Number',
  yearLevel: '7',
  tags: [],
  problem: '',
  solution: '',
  reference: '',
  isExtension: false,
};
const partialFormSchema = questionSchema.partial();
const formUpdater = (prev: FormState, next: Partial<FormState>) => {
  const updates = partialFormSchema.parse(next);
  return { ...prev, ...updates };
};

const validateQuestion = (questionData: Question) => {
  try {
    const result = questionSchema
      .transform(trimQuestion)
      .refine(
        (question) => question.problem !== '' && question.solution !== '',
        { message: 'problem and solution cannot be empty!' }
      )
      .safeParse(questionData);

    if (!result.success) {
      const errorMessage = zodErrorParser(result.error);
      throw new Error(errorMessage);
    }

    return result.data;
  } catch (error: any) {
    console.error('Error validating question: ', error);
    throw error;
  }
};

const QuestionForm = () => {
  const [formState, updateFormState] = useReducer(formUpdater, INITIAL_STATE);
  const { formStatus, setMessage, setError, setLoading } = useFormStatus();
  const formCompoentProps = { formState, updateFormState };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading();

    try {
      const questionData = validateQuestion(formState);
      const _id = await postQuestion(questionData);
      updateFormState({
        tags: [],
        problem: '',
        solution: '',
      });
      setMessage(`question successfully created with the following id: ${_id}`);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TopicForm {...formCompoentProps} />
        <YearLevelForm {...formCompoentProps} />
        <ExtensionForm {...formCompoentProps} />
        <TagsForm {...formCompoentProps} />
        <MarkdownForm
          formKey="problem"
          label="Problem"
          {...formCompoentProps}
        />
        <MarkdownForm
          formKey="solution"
          label="Solution"
          {...formCompoentProps}
        />
        <TextInput
          label="Reference"
          value={formState.reference}
          setValue={(value) => updateFormState({ reference: value })}
        />
        <div>
          <button type="submit">Create Question</button>
        </div>
      </form>
      <FormStatus status={formStatus} />
    </div>
  );
};
export default QuestionForm;
