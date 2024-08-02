import twilio from 'twilio';

export async function GET(req) {
    const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

    const { searchCountry } = new URL(req.url);
    const country_name = searchCountry.get('country');

    const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    try {
        const country = await client.pricing.v1.phoneNumbers.countries(country_name).fetch();
        return Response.json(country.country)

    } catch (error) {
        return Response.json({ error: error.message });
    }
}
