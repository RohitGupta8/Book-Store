/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';
dotenv.config('./.env');
import nodemailer from 'nodemailer';
import otp from '../models/otp'

export const sendEmail = (mailMessage) => {
    const otpcode = Math.random().toString(36).substring(2, 12);
    // eslint-disable-next-line new-cap
    const optData = new otp({
        email: mailMessage.email,
        code: otpcode,
        expireIn: new Date().getTime() + 300 * 1000
    });
    optData.save();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const message = {
        from: '"BOOK-STORE" <no-reply@BOOKSTORE.com>',
        to: mailMessage.email,
        subject: `${otpcode} is your Account recovery code.`,
        html: `<span style="text-align: center;"><h1>Hi , ${mailMessage.email}</h1></span><div style="text-align: center;"><h3>We received a request to reset your BOOK STORE App password.<br>Enter the following one time password:</h3>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpcode}
  </h2></div><br><br><h5>(NOTE:- If you don’t use this otp within 3 hours, it will expire.)</h5><br><h5>Thanks,</h5><br><h4><span>Regards,<br>Team FundooNote</span></h4><br>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            return info.response;
        }
    });
};
