import twilio from 'twilio';

export async function GET(req) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

    const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const { searchParams } = new URL(req.url);
    const searchCountry = searchParams.get('country');

    try {
        const phoneNumbers =await client.availablePhoneNumbers(searchCountry).local.list({
            areaCode: 510,
            limit: 20,
        });
        return Response.json(phoneNumbers);

    } catch (error) {
        return Response.json({ error: error.message });
    }
}