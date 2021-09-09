import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";

const EMAIL_LOGIN = "sportresurs12345@gmail.com";
const EMAIL_PASS = "qw12er34qw12";

const RECIPIENT_EMAIL = "keyshet@gmail.com";
const EMAIL_TITLE = "Contact Us";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASS,
  },
});

const emailSender = (name, phoneNumber, details) => {
  try {
    transporter.sendMail({
      to: RECIPIENT_EMAIL,
      subject: EMAIL_TITLE,
      html: `
        <p>Имя: ${name}</p>
        <p>Номер телефона: ${phoneNumber}</p>
        <p>Детали сообщения: ${details}</p>
      `,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    Sentry.captureException(err);
  }
};

export default emailSender;
