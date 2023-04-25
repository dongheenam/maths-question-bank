'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';
import styles from './Markdown.module.css';

type Props = {
  text: string;
};
const Markdown = ({ text }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      className={styles.root}
    >
      {text}
    </ReactMarkdown>
  );
};
export default Markdown;
