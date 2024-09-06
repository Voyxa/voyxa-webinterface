import NextAuth, { NextAuthOptions, Account, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import { GraphQLClient } from 'graphql-request';
import { JWT } from "next-auth/jwt";

// Define a type for the additional data you expect from the GraphQL mutation
interface SocialLoginResponse {
  socialLogin: {
    first_name: string;
    last_name: string;
    email_id: string;
    company: string;
    industry: string;
  };
}

// Extend the JWT type to include custom properties
interface CustomJWT extends JWT {
  accessToken?: string;
  idToken?: string;
  code?: string;
  account?: {
    provider: string;
    type: string;
    idToken?: string;
    accessToken?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    industry?: string;
  };
  profile?: {
    email?: string;
    name?: string;
  };
}

// Extend the Session type to include custom properties
interface CustomSession extends Session {
  accessToken?: string;
  idToken?: string;
  code?: string;
  account?: CustomJWT['account'];
  profile?: CustomJWT['profile'];
  firstName?: string;
  lastName?: string;
  company?: string;
  industry?: string;
}

const client = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string);

const socialLoginMutation = `
  mutation SocialLogin($provider: String!, $email: String!, $name: String!) {
    socialLogin(provider: $provider, email: $email, name: $name) {
      first_name
      last_name
      email_id
      company
      industry
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
    async signIn({ account, profile }): Promise<boolean> {
      if (!account || !profile) return false;

      try {
        const response: SocialLoginResponse = await client.request(socialLoginMutation, {
          provider: account.provider,
          email: profile.email as string,
          name: profile.name as string,
        });

        account.firstName = response.socialLogin.first_name;
        account.lastName = response.socialLogin.last_name;
        account.company = response.socialLogin.company;
        account.industry = response.socialLogin.industry;

        return true;
      } catch (error) {
        console.error('Error during social login:', error);
        return false;
      }
    },
    async jwt({ token, account, profile }: { token: CustomJWT, account?: Account | null, profile?: Profile | null }): Promise<CustomJWT> {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;

        token.account = {
          provider: account.provider,
          type: account.type,
          idToken: account.id_token,
          accessToken: account.access_token,
          firstName: account.firstName as string,
          lastName: account.lastName as string,
          company: account.company as string,
          industry: account.industry as string,
        };
      }

      if (profile) {
        token.profile = {
          email: profile.email,
          name: profile.name,
        };
      }

      return token;
    },
    async session({ session, token }: { session: CustomSession, token: CustomJWT }): Promise<CustomSession> {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.code = token.code;
      session.account = token.account;
      session.profile = token.profile;

      if (token.account) {
        session.firstName = token.account.firstName;
        session.lastName = token.account.lastName;
        session.company = token.account.company;
        session.industry = token.account.industry;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


