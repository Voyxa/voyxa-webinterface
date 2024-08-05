import twilio from 'twilio';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  try {
    const { phoneNumber, country } = await req.json();
    const purchasedNumber = await client.incomingPhoneNumbers.create({
      phoneNumber,
    //   smsUrl: 'https://your-callback-url.com/sms', // Update with your actual callback URL
    //   voiceUrl: 'https://your-callback-url.com/voice' // Update with your actual callback URL
    });

    return NextResponse.json(purchasedNumber, { status: 200 });
  } catch (error) {
    console.error('Error purchasing phone number:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}