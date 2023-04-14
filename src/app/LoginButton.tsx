'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const LoginButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Link href="/api/auth/signout">Sign out</Link>
      ) : (
        <Link href="/api/auth/signin">Sign in</Link>
      )}
    </>
  );
};
export default LoginButton;
