import getQuestion from '@/app/api/questions/getQuestion';
import { redirect } from 'next/navigation';
import EditForm from './EditForm';
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
        <li>Tags: {question.tags.join(', ')}</li>
      </ul>
      <h2>Problem</h2>
      <Markdown text={question.problem} />
      <h2>Solution</h2>
      <Markdown text={question.solution} />
      <EditForm question={toPlainDocument(question)} />
    </main>
  );
}
