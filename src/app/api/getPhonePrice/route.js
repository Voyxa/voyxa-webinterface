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
        const country = await client.pricing.v1.phoneNumbers.countries(searchCountry).fetch();

        const price = country.phoneNumberPrices[0].current_price;
        const priceUnit = country.priceUnit;
        return Response.json({price, priceUnit})

    } catch (error) {
        return Response.json({ error: error.message });
    }
}
