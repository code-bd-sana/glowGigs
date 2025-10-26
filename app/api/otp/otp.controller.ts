import { otpGenaretor, transporter } from "@/lib/utils";
import Otp from "./otp.model";
import { dbConnect } from "@/lib/dbConnect";

export const sendOtp = async(email:string)=>{
    
    
    await dbConnect();

    const deleteExistOtp = await Otp.deleteMany({email:email});
    


      const otp = (await otpGenaretor()).toString();

      console.log(otp, "otp generate holo")
             const newOtp = new Otp({email:email, otp:otp});
        await newOtp.save();
           const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8"
          <title>Your Verification Code - Secure Access</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  line-height: 1.6;
                  color: #333333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
              }
              .header {
                  background-color: #e60459;
                  color: white;
                  padding: 20px;
                  text-align: center;
                  border-radius: 5px 5px 0 0;
              }
              .content {
                  padding: 20px;
                  background-color: #f9f9f9;
                  border-radius: 0 0 5px 5px;
                  border: 1px solid #e0e0e0;
                  border-top: none;
              }
              .footer {
                  margin-top: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #777777;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #e60459;
                  color: white !important;
                  text-decoration: none;
                  border-radius: 3px;
                  margin: 15px 0;
              }
              .logo {
                  max-width: 150px;
                  margin-bottom: 15px;
              }
              .otp-box {
                  display: inline-block;
                  background: #ffe4ec;
                  color: #e60459;
                  font-weight: bold;
                  font-size: 18px;
                  padding: 8px 15px;
                  border-radius: 5px;
                  margin: 10px 0;
              }
          </style>
      </head>
      <body>
          <div class="header">
              <h1>Your Verification Code - Secure Access</h1>
          </div>
          <div class="content">
      

              ${
                otp 
                ? `<p>Your OTP is: <span class="otp-box">${otp}</span></p>` 
                : ""
              }

           
              <p>If you have any questions, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>Your Team</p>
          </div>
          <div class="footer">
              <p>© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
              <p>
                  <a href="#" style="color: #e60459;">Privacy Policy</a> | 
                  <a href="#" style="color: #e60459;">Terms of Service</a>
              </p>
          </div>
      </body>
      </html>
    `;

  await transporter.sendMail({
      from: "Hunkey Butler",
      to: email,
      subject: 'Your Verification Code - Secure Access',
      text: ' Dear Valued Customer,',
      html: htmlTemplate
    });
}