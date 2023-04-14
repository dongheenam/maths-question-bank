'use client';

import { useSession } from 'next-auth/react';

const CheckSession = () => {
  const { data: session } = useSession();

  return (
    <div>{session ? `Hello, ${session.user?.name}` : 'not logged in!'}</div>
  );
};
export default CheckSession;
