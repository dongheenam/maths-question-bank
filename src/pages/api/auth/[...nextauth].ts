import NextAuth from 'next-auth';

import { authOptions } from '../../../common/server/authUtils';

const handler = NextAuth(authOptions);
export default handler;
// export { handler as GET, handler as POST };
