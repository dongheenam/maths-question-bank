'use client';

import { useState } from 'react';

type Props<T extends string> = {
  value: T[];
  setValue: (value: T[]) => void;
};
const MultiTextInput = <T extends string>({ value, setValue }: Props<T>) => {
  const [newItem, setNewItem] = useState('');

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

  return (
    <div>
      {value.map((item, index) => (
        <label key={index}>
          <span>{index}: </span>
          <input
            type="text"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button type="button" onClick={() => handleDelete(index)}>
            X
          </button>
        </label>
      ))}
      <label>
        <span>{value.length}: </span>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>
          +
        </button>
      </label>
    </div>
  );
};
export default MultiTextInput;
