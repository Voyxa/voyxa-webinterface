import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";
import { gql, GraphQLClient } from 'graphql-request';

interface UserInputDto {
  first_name: string;
  last_name: string;
  user_phone_number: string;
  email_id: string;
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

// Define the GraphQL client
const graphQLClient = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`, // Use appropriate token if necessary
  },
});

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENANT_ID as string, // Optional
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }): Promise<boolean> {
      // Extract user data to match UserInputDto
      console.log(user)
      const userInputDto: UserInputDto = {
        first_name: user.name?.split(" ")[0] || "",
        last_name: user.name?.split(" ").slice(1).join(" ") || "",
        user_phone_number: "", // Phone number is often not provided by Google/Microsoft OAuth
        email_id: user.email!,
        company: "", // Add company if available
        industry: "", // Add industry if available
      };

      // GraphQL mutation for registering the user
      const mutation = gql`
        mutation RegisterUser($userDetails: UserInputDto!) {
          registerUser(userDetails: $userDetails) {
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

      try {
        // Call the GraphQL endpoint to register the user
        const response = await graphQLClient.request<{ registerUser: UserOutputDto }>(mutation, {
          userDetails: userInputDto,
        });

        console.log('User registered:', response.registerUser);

        // Optionally store tokens in the session or a secure cookie
        return true; // Continue the sign-in process
      } catch (error) {
        console.error('Error registering user:', error);
        return false; // Reject the sign-in process
      }
    },
    async session({ session, token, user }) {
      // Customize the session object if necessary, e.g., attach the access token
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // Handle token processing if necessary, e.g., attach access and refresh tokens
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
