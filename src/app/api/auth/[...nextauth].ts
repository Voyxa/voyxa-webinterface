// import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import MicrosoftProvider from "next-auth/providers/azure-ad";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: String(process.env.GOOGLE_CLIENT_ID),
//       clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
//     }),  
//     MicrosoftProvider({
//       clientId: String(process.env.MICROSOFT_CLIENT_ID),
//       clientSecret: String(process.env.MICROSOFT_CLIENT_SECRET),
//       tenantId: process.env.MICROSOFT_TENANT_ID, // Optional
//     }),   
//   ],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };