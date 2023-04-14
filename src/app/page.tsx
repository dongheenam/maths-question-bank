import Link from 'next/link';

export default function RootPage() {
  return (
    <main>
      <h1>Homepage</h1>
      <Link href="/questions">Start viewing questions</Link>
    </main>
  );
}
