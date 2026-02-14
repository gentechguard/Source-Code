const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID')!;
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN')!;
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER')!;
const TWILIO_WHATSAPP_FROM = Deno.env.get('TWILIO_WHATSAPP_FROM')!;

const twilioAuth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
const twilioBaseUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

/**
 * Send an SMS via Twilio
 */
export async function sendSms(to: string, body: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(twilioBaseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${twilioAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: to,
        From: TWILIO_PHONE_NUMBER,
        Body: body,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Twilio SMS error:', result);
      return { success: false, error: result.message || 'SMS send failed' };
    }

    return { success: true };
  } catch (err) {
    console.error('Twilio SMS exception:', err);
    return { success: false, error: 'SMS service unavailable' };
  }
}

/**
 * Send a WhatsApp message via Twilio (with optional media attachment)
 */
export async function sendWhatsApp(
  to: string,
  body: string,
  mediaUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const params: Record<string, string> = {
      To: `whatsapp:${to}`,
      From: TWILIO_WHATSAPP_FROM,
      Body: body,
    };

    if (mediaUrl) {
      params.MediaUrl = mediaUrl;
    }

    const response = await fetch(twilioBaseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${twilioAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Twilio WhatsApp error:', result);
      return { success: false, error: result.message || 'WhatsApp send failed' };
    }

    return { success: true };
  } catch (err) {
    console.error('Twilio WhatsApp exception:', err);
    return { success: false, error: 'WhatsApp service unavailable' };
  }
}
