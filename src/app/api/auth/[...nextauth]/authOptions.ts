import type { NextAuthOptions } from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import client from '@/common/mongoClient';

if (
  process.env.AZURE_AD_CLIENT_ID === undefined ||
  process.env.AZURE_AD_CLIENT_SECRET === undefined ||
  process.env.NEXTAUTH_SECRET === undefined
) {
  throw new Error('environment variables for auth not loaded!');
}

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client.connect(), {
    collections: {
      Accounts: 'auth.accounts',
      Sessions: 'auth.sessions',
      Users: 'auth.users',
      VerificationTokens: 'auth.verificationTokens',
    },
  }),
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  debug: true,
};
export default authOptions;
