import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: "bannah76769@gmail.com",
        pass: "noqq kzxv olzf clzz",
      },})




    export  const otpGenaretor = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};
