import { resend } from '@/lib/resend';

interface WelcomeEmailProps {
  userEmail: string;
  userName?: string;
  tempPass: string;
}

export async function sendWelcomeEmail({ userEmail, userName, tempPass }: WelcomeEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ERP Ironheight <onboarding@resend.dev>',
      to: [userEmail],
      subject: 'Bienvenido al Portal Administrativo - ERP Ironheight',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #2563eb; text-align: center;">¡Bienvenido a ERP Ironheight!</h1>
          <p style="font-size: 16px; color: #333;">Hola <strong>${userName || 'Usuario'}</strong>,</p>
          <p style="font-size: 16px; color: #333;">Se ha creado tu cuenta en el portal administrativo. Estas son tus credenciales de acceso temporal:</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 5px 0; color: #666;"><strong>Usuario:</strong> ${userEmail}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Contraseña Temporal:</strong> <code style="background: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${tempPass}</code></p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;">Ingresar al ERP</a>
          </div>

          <p style="font-size: 14px; color: #999; margin-top: 40px; text-align: center;">
            Por motivos de seguridad, te recomendamos cambiar tu contraseña una vez hayas ingresado por primera vez.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email con Resend:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Excepción en el servicio de email:', err);
    return { success: false, error: err };
  }
}
