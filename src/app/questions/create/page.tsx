import { getAuthSession } from '@/common/server/authUtils';
import QuestionCreateForm from './QuestionCreateForm';

export default async function Page() {
  const session = await getAuthSession();

  return (
    <main>
      <h1>New question</h1>
      {session ? <QuestionCreateForm /> : <p>You are not logged in!</p>}
    </main>
  );
}
