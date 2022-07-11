// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (emailInfo) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: +process.env.MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(emailInfo);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// main().catch(console.error);

export const sendAdminUserVerificationMail = (userObj) => {
  const link = `${process.env.DOMAIN}/admin-verification?email=${userObj.email}&code=${userObj.verificationCode}`;

  const emailInfo = {
    from: '"Garry e-comm store' + process.env.MAIL_USER, // sender address
    to: userObj.email, // list of receivers
    subject: "Account verification required", // Subject line
    text: `hi ${userObj.fName} please click the link to verify and activate your account. ${link}`, // plain text body
    html: `
    <p>Hello ${userObj.fName}</p>
    <br/>
    <br/>
    <hr/>
    <p>Please follow the link below to verify and activate your admin account</p>
    <br/>
    <hr/>
    <a href="${link}">${link}</a>
    <br/>
    <p>| Garry e-comm store |</p>

    `, // html body
  };

  sendMail(emailInfo);
};
