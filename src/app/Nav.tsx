import Link from 'next/link';
import type { Session } from 'next-auth';

import CheckSession from './CheckSession';
import LoginButton from './LoginButton';

import styles from './Nav.module.css';

type Props = {
  session: Session | null;
};
export default function Nav({ session }: Props) {
  console.log(session);

  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>Maths QuestionBank</span>
      <Link href="/">Home</Link>
      <Link href="/questions">Questions</Link>
      <div className={styles['check-login']}>
        <CheckSession />
      </div>
      <LoginButton />
    </nav>
  );
}
