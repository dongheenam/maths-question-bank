'use client';

import Select from '@/common/components/Select';
import { TOPICS, Topic, YEAR_LEVELS, YearLevel } from './types';
import MultiTextInput from '@/common/components/MultiTextInput';
import MarkdownEdit from '@/common/components/MarkdownEdit';

type TopicFormProps =
  | {
      formState: { topic: Topic };
      updateFormState: (next: { topic: Topic }) => void;
      allowEmpty?: false;
    }
  | {
      formState: { topic: Topic | '' };
      updateFormState: (next: { topic: Topic | '' }) => void;
      allowEmpty: true;
    };
export function TopicForm({
  formState,
  updateFormState,
  allowEmpty = false,
}: TopicFormProps) {
  const options = allowEmpty ? (['', ...TOPICS] as const) : TOPICS;
  return (
    <Select
      value={formState.topic}
      // @ts-ignore (TODO: fix issue with union types)
      setValue={(value: Topic | '') => updateFormState({ topic: value })}
      options={options}
      label="Topic"
    />
  );
}

type YearLevelFormProps =
  | {
      formState: { yearLevel: YearLevel };
      updateFormState: (next: { yearLevel: YearLevel }) => void;
      allowEmpty?: false;
    }
  | {
      formState: { yearLevel: YearLevel | '' };
      updateFormState: (next: { yearLevel: YearLevel | '' }) => void;
      allowEmpty: true;
    };
export const YearLevelForm = ({
  formState,
  updateFormState,
  allowEmpty = false,
}: YearLevelFormProps) => {
  const options = allowEmpty ? (['', ...YEAR_LEVELS] as const) : YEAR_LEVELS;
  return (
    <Select
      value={formState.yearLevel}
      setValue={(value: YearLevel | '') =>
        // @ts-ignore (TODO: fix issue with union types)
        updateFormState({ yearLevel: value })
      }
      options={options}
      label="Year"
    />
  );
};

type ExtensionFormProps = {
  formState: { isExtension: boolean };
  updateFormState: (next: { isExtension: boolean }) => void;
};
export const ExtensionForm = ({
  formState,
  updateFormState,
}: ExtensionFormProps) => {
  return (
    <label>
      <span>Extension</span>
      <input
        type="checkbox"
        checked={formState.isExtension}
        onChange={(e) => updateFormState({ isExtension: e.target.checked })}
      />
    </label>
  );
};

type TagsFormProps = {
  formState: { tags: string[] };
  updateFormState: (next: { tags: string[] }) => void;
};
export const TagsForm = ({ formState, updateFormState }: TagsFormProps) => {
  return (
    <div>
      <span>Tags</span>
      <MultiTextInput
        ariaLabel="tag"
        value={formState.tags}
        setValue={(value) => updateFormState({ tags: value })}
      />
    </div>
  );
};

type MarkdownFormProps<K extends string> = {
  formKey: K;
  formState: Record<K, string>;
  updateFormState: (next: Record<K, string>) => void;
  label: string;
};
export const MarkdownForm = <K extends string>({
  formKey,
  formState,
  updateFormState,
  label,
}: MarkdownFormProps<K>) => {
  return (
    <label>
      <span>{label}</span>
      <MarkdownEdit
        text={formState[formKey]}
        setText={(value) =>
          updateFormState({ [formKey]: value } as Record<K, string>)
        }
      />
    </label>
  );
};
