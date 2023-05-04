import getQuestion from '@/app/api/questions/getQuestion';
import { redirect } from 'next/navigation';
import QuestionEditForm from './QuestionEditForm';
import { toPlainDocument } from '@/common/server/utils';
import Markdown from '@/common/components/Markdown';

type Props = {
  params: { _id: string };
};
export default async function Page({ params }: Props) {
  const _id = params._id;
  const question = await getQuestion(_id);
  if (!question) {
    redirect('/questions');
  }

  return (
    <main>
      <h1>View question</h1>
      <h2>Meta</h2>
      <ul>
        <li>Topic: {question.topic}</li>
        <li>Year: {question.yearLevel}</li>
        <li>Extension: {question.isExtension ? 'yes' : 'no'}</li>
        <li>Tags: {question.tags.join(', ')}</li>
        <li>Reference: {question.reference}</li>
      </ul>
      <h2>Problem</h2>
      <Markdown text={question.problem} />
      <h2>Solution</h2>
      <Markdown text={question.solution} />
      <QuestionEditForm question={toPlainDocument(question)} />
    </main>
  );
}
