import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

export const sendEmail = async (
  to: string,
  html: string,
  subject: string,
  comment: string
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587,
    secure: false, 
    auth: {
      user: 'smmubasshiralkasshaf15@gmail.com',
      pass: 'ceuv qvlu wweh cdmf',
    },
  });

  await transporter.sendMail({
    from: `"MealHut" <${process.env.EMAIL_USER}>`,
    to,
    subject, 
    text: comment, 
    html, 
  });
};
