import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('Falta RESEND_API_KEY en las variables de entorno');
}

export const resend = new Resend(process.env.RESEND_API_KEY);
