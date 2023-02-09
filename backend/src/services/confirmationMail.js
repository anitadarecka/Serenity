require("dotenv").config();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "serenityEmail.html");
const filePath2 = path.join(__dirname, "/images/image-1.png");
const filePath3 = path.join(__dirname, "/images/mailBackground.png");
// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const confirmationMail = (email, firstname) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;

    // define the email options
    const mailOptions = {
      from: "'Serenity' <anita-darecka_student2022@wilder.school",
      to: email,
      subject: `Bienvenue sur Serenity, ${firstname}`,
      html: data,
      attachments: [
        {
          filename: "image-1.png",
          path: filePath2,
          cid: "image-1",
        },
        {
          filename: "mailBackground.png",
          path: filePath3,
          cid: "mail-background",
        },
      ],
    };

    // send the email
    // eslint-disable-next-line no-shadow
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      // eslint-disable-next-line no-restricted-syntax
      console.log(`Email sent: ${info.response}`);
    });
  });
};

module.exports = confirmationMail;
