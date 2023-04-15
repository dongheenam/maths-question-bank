import Link from 'next/link';

export default async function Page() {
  return (
    <main>
      <h1>Questions</h1>
      <Link href="/questions/create">Create new question</Link>
    </main>
  );
}
