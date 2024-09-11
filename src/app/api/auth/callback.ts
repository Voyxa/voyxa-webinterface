// pages/api/auth/callback.ts

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { code, state } = req.query;
  
  if (!code) {
    res.status(400).json({ error: 'Authorization code not provided.' });
    return;
  }

  try {
    // Exchange authorization code for tokens
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code as string,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: 'http://localhost:3000/api/auth/callback',
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();

    if (data.error) {
      res.status(400).json({ error: data.error });
      return;
    }

    // Extract tokens from response
    const { access_token, refresh_token } = data;

    // You can now use these tokens as needed or send them to the client
    res.status(200).json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
