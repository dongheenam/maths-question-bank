'use client';

import { RefObject, useRef, useState } from 'react';

type Props<T extends string> = {
  value: T[];
  setValue: (value: T[]) => void;
};
const MultiTextInput = <T extends string>({ value, setValue }: Props<T>) => {
  const [newItem, setNewItem] = useState('');
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAdd = () => {
    if (newItem.trim()) {
      setValue([...value, newItem as T]);
      setNewItem('');
    }
  };
  const handleChange = (index: number, newValue: string) => {
    const newValues = [...value];
    newValues[index] = newValue as T;
    setValue(newValues);
  };
  const handleDelete = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  };
  const handleKeyPressDelete = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === 'Backspace' && event.currentTarget.value === '') {
      event.preventDefault();
      handleDelete(index);

      // Move focus to the previous input when the current input is deleted
      if (refs.current[index - 1]) {
        (refs.current[index - 1] as HTMLInputElement).focus();
      }
    }
  };
  const handlePressEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    addNew: boolean
  ) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
      event.preventDefault();
      if (addNew) {
        handleAdd();
      }
    }
  };

  return (
    <div>
      {value.map((item, index) => (
        <div key={index}>
          <label>
            <span>{index}: </span>
            <input
              type="text"
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                handleKeyPressDelete(e, index);
                handlePressEnter(e, false);
              }}
              ref={(input) => {
                refs.current[index] = input;
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => handleDelete(index)}
            tabIndex={-1}
          >
            X
          </button>
        </div>
      ))}
      <div>
        <label>
          <span>{value.length}: </span>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => handlePressEnter(e, true)}
          />
        </label>
        <button type="button" onClick={handleAdd} tabIndex={-1}>
          +
        </button>
      </div>
    </div>
  );
};
export default MultiTextInput;
