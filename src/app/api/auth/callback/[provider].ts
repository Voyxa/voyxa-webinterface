// // pages/api/auth/callback/[provider].ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import fetch from 'node-fetch';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { code, state } = req.query;

//   if (typeof code === 'string') {
//     try {
//       const response = await fetch('https://oauth2.googleapis.com/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//           code: code,
//           client_id: process.env.GOOGLE_CLIENT_ID!,
//           client_secret: process.env.GOOGLE_CLIENT_SECRET!,
//           redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
//           grant_type: 'authorization_code',
//         }),
//       });

//       const data = await response.json();

//       if (data.error) {
//         throw new Error(data.error);
//       }

//       // Here you can use the tokens or pass them to a session
//       const { access_token, refresh_token } = data;

//       // For demonstration, simply returning tokens
//       res.status(200).json({ access_token, refresh_token });
//     } catch (error) {
//       console.error('Error handling OAuth callback:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.status(400).json({ error: 'Authorization code not provided.' });
//   }
// }
