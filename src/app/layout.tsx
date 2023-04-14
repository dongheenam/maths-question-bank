import '@/styles/global.css';
import './layout.css';
import Nav from './Nav';

export const metadata = {
  title: 'Maths question bank',
  description: 'Search and save maths questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div id="root">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
