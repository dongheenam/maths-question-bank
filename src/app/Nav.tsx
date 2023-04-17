import Link from 'next/link';
import type { Session } from 'next-auth';

import styles from './Nav.module.css';

type Props = {
  session: Session | null;
};
export default function Nav({ session }: Props) {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>Maths QuestionBank</span>
      <Link href="/">Home</Link>
      <Link href="/questions">Questions</Link>
      <div className={styles['check-login']}>
        {session ? `Hello, ${session.user?.name}` : 'not logged in!'}
      </div>
      <div>
        {session ? (
          <Link href="/api/auth/signout">Sign out</Link>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
