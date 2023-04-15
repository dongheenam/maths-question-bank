import { getAuthSession } from '@/common/server/authUtils';
import QuestionForm from './QuestionForm';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <main>
      <h1>New question</h1>
      {session ? <QuestionForm /> : <p>You are not logged in!</p>}
    </main>
  );
}
