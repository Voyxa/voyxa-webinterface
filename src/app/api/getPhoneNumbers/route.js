import twilio from 'twilio';

export async function GET(req) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
        console.error('Twilio credentials are not set');
        return Response.json({ error: 'Twilio credentials are not set' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const searchCountry = searchParams.get('country');
    if (!searchCountry) {
        return Response.json({ error: 'Country code is required' }, { status: 400 })
    }

    const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    try {
        const phoneNumbers =await client.availablePhoneNumbers(searchCountry).local.list({
            areaCode: 510,
            limit: 40,
        });
        if (Array.isArray(phoneNumbers) == false) {
            return Response.json([]);
        }
        console.log("available phone numbers success ===== ", typeof phoneNumbers);

        return Response.json(phoneNumbers);

    } catch (error) {
        console.log("available phone numbers failure ++++++ ", error.message);
        // return Response.json({ error: error.message });
        return Response.json([]);
    }
}