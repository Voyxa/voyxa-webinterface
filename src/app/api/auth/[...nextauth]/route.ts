import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import { GraphQLClient } from 'graphql-request';
import fetch from 'node-fetch';

const client = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string);

// Define the GraphQL mutation for social login
const socialLoginMutation = /* GraphQL */ `
  mutation SocialLogin($provider: String!, $code: String!) {
    socialLogin(provider: $provider, code: $code) {
      first_name
      last_name
      user_phone_number
      email_id
      company
      industry
      access_token
      refresh_token
    }
  }
`;

// Define the NextAuth configuration
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 100000,
      },
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENANT_ID as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async signIn({ account, tokens }) {
      console.log('SignIn callback:', account, tokens);
      if (account?.provider && tokens?.accessToken) {
        try {
          await client.request(socialLoginMutation, {
            provider: account.provider,
            code: tokens.accessToken, // Use the access token here
          });
          return true;
        } catch (error) {
          console.error('Error during social login:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  async authorize({ req, res }) {
    // Handle the OAuth callback directly within NextAuth
    const { code } = req.query;
    if (code) {
      try {
        const response = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            code: code as string,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            client_secret: process.env.GOOGLE_CLIENT_SECRET!,
            redirect_uri: 'http://localhost:3000/api/auth/callback', // Update as needed
            grant_type: 'authorization_code',
          }),
        });

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Handle the tokens as needed
        const { access_token, refresh_token } = data;

        // Optionally, you can store these tokens or pass them to a function
        // Example: await client.request(socialLoginMutation, { provider: 'google', code: access_token });

        res.status(200).json({ access_token, refresh_token });
      } catch (error) {
        console.error('Error handling OAuth callback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(400).json({ error: 'Authorization code not provided.' });
    }
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
