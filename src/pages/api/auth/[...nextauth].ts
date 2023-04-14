import NextAuth from 'next-auth';

import authOptions from './authOptions';
console.log(process.env.VERCEL_URL);
const handler = NextAuth(authOptions);
export default handler;
// export { handler as GET, handler as POST };
