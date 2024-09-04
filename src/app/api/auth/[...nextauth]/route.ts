import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string);

const socialLoginMutation = `
  mutation SocialLogin($provider: String!, $email: String!, $name: String!) {
    socialLogin(provider: $provider, email: $email,name: $name) {
      first_name
      email_id
      company
      industry
      access_token
      refresh_token
    }
  }
`;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
          response_type: "code",  // Ensures the response contains the authorization code
        },
      },
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENANT_ID as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      
        try {
          await client.request(socialLoginMutation, {
            provider: account.provider,
            email: profile.email,
            name: profile.name, // OAuth 2.0 authorization code
          });
          return true;
        } catch (error) {
          console.error('Error during social login:', error);
          return false;
        }
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.code = account.code;  // Store the code for later use
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.code = token.code;  // Attach the code to the session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
