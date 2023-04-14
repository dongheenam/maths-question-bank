import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';

import Nav from './Nav';
import AuthContext from './AuthContext';

import '@/styles/global.css';
import './layout.css';

export const metadata = {
  title: 'Maths question bank',
  description: 'Search and save maths questions',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <body>
        <div id="root">
          <AuthContext>
            <Nav session={session} />
            {children}
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
