import NextAuth, { NextAuthOptions, Account, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { GraphQLClient } from 'graphql-request';
import { JWT } from "next-auth/jwt";
// Define a type for the user to include additional fields
interface customUser extends User {
  id: string;
  first_name: string;
  last_name: string;
  user_phone_number: string;
  email_id: string;
  company?: string;
  industry?: string;
  access_token: string;
  refresh_token: string;
}


// Extend the JWT type to include custom properties
interface CustomJWT extends JWT {
  accessToken?: string;
  idToken?: string;
  account?: {
    provider: string;
    type: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    industry?: string;
  };
}

// Extend the Session type to include custom properties
interface CustomSession extends Session {
  accessToken?: string;
  idToken?: string;
  account?: CustomJWT['account'];
  firstName?: string;
  lastName?: string;
  company?: string;
  industry?: string;
}
interface UserOutputDto {
  first_name: string;
  last_name: string;
  user_phone_number: string;
  email_id: string;
  company?: string;
  industry?: string;
  access_token: string;
  refresh_token: string;
}

interface UserLoginResponse {
  userLogin: UserOutputDto;
}

// Define a type for the response from the GraphQL mutation for social login
interface SocialLoginResponse {
  socialLogin: {
    first_name: string;
    last_name: string;
    email_id: string;
    company: string;
    industry: string;
  };
}

const client = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string);

const socialLoginMutation = `
  mutation SocialLogin($provider: String!, $code: String!) {
    socialLogin(provider: $provider, code: $code) {
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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        login_id: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials)
        if (!credentials) throw new Error("Credentials not provided");

        const { login_id, password } = credentials;

        if (!login_id || !password) {
          throw new Error("Please provide both email and password");
        }

        const loginMutation = `
          mutation UserLogin($loginDetails: LoginInputDto!) {
            userLogin(loginDetails: $loginDetails) {
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

        const variables = { loginDetails: { login_id, password } };

        try {
          const data = await client.request<{ userLogin: customUser }>(loginMutation, variables);
          const userOutput = data.userLogin;

          if (userOutput) {
            return {
              id: userOutput.email_id,
              first_name: userOutput.first_name,
              last_name: userOutput.last_name,
              user_phone_number: userOutput.user_phone_number,
              email_id: userOutput.email_id,
              company: userOutput.company,
              industry: userOutput.industry,
              access_token: userOutput.access_token,
              refresh_token: userOutput.refresh_token,
            };
          }
          throw new Error("Invalid credentials");
        } catch (error) {
          console.error('Authorization Error:', error);
          throw new Error(error instanceof Error ? error.message : "Unknown login error");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: { params: { scope: "openid email profile" } },
      httpOptions: { timeout: 100000 },
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENANT_ID as string,
      authorization: {
        params: {
          scope: "openid email profile offline_access",
          response_type: "code",
          response_mode: "query",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User | null; account: Account | null }) {

      if (!account) return false;

      if (account.provider !== 'credentials') {
        try {
          const response: SocialLoginResponse = await client.request(socialLoginMutation, {
            provider: account.provider,
            code: account.access_token,
          });

          account.firstName = response.socialLogin.first_name;
          account.lastName = response.socialLogin.last_name;
          account.company = response.socialLogin.company;
          account.industry = response.socialLogin.industry;
        } catch (error) {
          console.error('Error during social login:', error);
          return false;
        }
      } else {
        if (user) {
          account.firstName = user.first_name;
          account.lastName = user.last_name;
          account.company = user.company;
          account.industry = user.industry;
        }
      }

      return true;
    },
    async jwt({ token, account }: { token: CustomJWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.account = {
          provider: account.provider,
          type: account.type,
          firstName: account.firstName as string,
          lastName: account.lastName as string,
          company: account.company as string,
          industry: account.industry as string,
        };
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.account = token.account;

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
