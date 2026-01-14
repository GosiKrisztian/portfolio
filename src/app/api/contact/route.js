import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Validálás (alapvető ellenőrzés)
    if (!name || !email || !message) {
      return Response.json({ error: 'Minden mező kitöltése kötelező!' }, { status: 400 });
    }

    /* Email nekünk */
    await resend.emails.send({
      from: 'PixelPitchPartners <onboarding@resend.dev>', // Ha lesz domained, ide írhatod a sajátodat
      to: 'gosikrisz@gmail.com', // Ide érkezik meg neked
      subject: `Új érdeklődő: ${name}`,
      html: `
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Üzenet:</strong></p>
        <p>${message}</p>
      `,
    });

    /* Email a usernek */
    await resend.emails.send({
      from: 'PixelPitchPartners <onboarding@resend.dev>', // Később: hello@pixelpitchpartners.hu
      to: email, // Az ügyfél e-mail címe, amit beírt a formba
      subject: 'Üzenetét sikeresen megkaptuk - PixelPitchPartners',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #64c8ff;">Köszönjük a megkeresést!</h2>
          <p>Kedves <strong>${name}</strong>,</p>
          <p>Ezt az automatikus e-mailt azért küldjük, mert üzenetet hagytál a <strong>PixelPitchPartners</strong> weboldalán.</p>
          <p>Csapatunk hamarosan átnézi a részleteket, és felvesszük veled a kapcsolatot a megadott e-mail címen.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">Ez egy automatikus visszaigazolás, kérjük ne válaszolj közvetlenül erre az e-mailre.</p>
          <p>Üdvözlettel,<br><strong>PixelPitchPartners csapata</strong></p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

}





/* import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Kérem töltse ki az összes mezőt' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Configure email transporter
    // NOTE: You need to set these environment variables in your .env.local file:
    // EMAIL_USER=your-email@gmail.com
    // EMAIL_PASSWORD=your-app-specific-password (for Gmail)
    // Or configure with your own SMTP settings
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to your company
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Új üzenet a weboldaltól: ${name}`,
      html: `
        <p><strong>Név:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Üzenet:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Üzenetét sikeresen fogadtuk - PixelPitchPartners',
      html: `
        <h2>Köszönjük az üzenetet!</h2>
        <p>Tisztelt ${name},</p>
        <p>Az üzenetét sikeresen fogadtuk. Hamarosan felvesszük Önnel a kapcsolatot.</p>
        <p>Üzenetét ide küldtük: <strong>${email}</strong></p>
        <br>
        <p>Üdvözlettel,<br>PixelPitchPartners csapata</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Üzenet sikeresen elküldve!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Hiba az üzenet küldése során. Kérem próbálja később.',
        details: error.message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} */
