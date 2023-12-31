import { registerAs } from '@nestjs/config';

export default registerAs(
  'emailTemplate',
  (): Record<string, any> => ({
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  }),
);
