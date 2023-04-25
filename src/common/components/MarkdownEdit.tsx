'use client';

import { useState } from 'react';
import MarkdownLazy from './MarkdownLazy';

import styles from './MarkdownEdit.module.css';

type Props = {
  text: string;
  setText: (text: string) => void;
};
const Editor = ({ text, setText }: Props) => {
  return <textarea value={text} onChange={(e) => setText(e.target.value)} />;
};
const Viewer = ({ text }: Pick<Props, 'text'>) => {
  return <MarkdownLazy text={text} />;
};

const MarkdownEdit = ({ text, setText }: Props) => {
  const [editMode, setEditMode] = useState(true);

  return (
    <div>
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? 'Preview' : 'Edit'}
      </button>
      <div>
        {editMode ? (
          <Editor text={text} setText={setText} />
        ) : (
          <Viewer text={text} />
        )}
      </div>
    </div>
  );
};
export default MarkdownEdit;
