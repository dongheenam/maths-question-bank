'use client';

import { lazy, Suspense } from 'react';
const Markdown = lazy(() => import('./Markdown'));

type Props = {
  text: string;
};
const MarkdownLazy = ({ text }: Props) => {
  return (
    <Suspense fallback={<div>{text}</div>}>
      <Markdown text={text} />
    </Suspense>
  );
};
export default MarkdownLazy;
