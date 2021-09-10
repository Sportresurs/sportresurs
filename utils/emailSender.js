import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";

// This approach requires a valid email address (Gmail).
// On your email account, you will need to give access to login
// from third-party applications https://myaccount.google.com/lesssecureapps?
// Also, this approach has limitations (500 emails per day / at a time).
// If the mail got into the "SPAM" section, you need to indicate the sender as "verified"
// After you indicate that this is a verified sender, email will stop getting into "SPAM"

const { EMAIL_LOGIN, EMAIL_PASS, RECIPIENT_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASS,
  },
});

const emailSender = (name, phoneNumber, details) => {
  const EMAIL_TITLE = `${name}: звернення з сайту майданчиків через форму зворотнього зв'язку`;
  const message = `
    <p>Шановний адмін сайту Спортресурс,<br>
    Користувач залишив запит для зворотного зв'язку:</p>
    <p>Ім'я: ${name}</p>
    <p>Номер телефону: ${phoneNumber}</p>
    <p>Деталі: ${details}</p>
    <p>Будь ласка, якщо візьмете запит в роботу, повідомте інших адміністраторів.<br>
    Дякуємо!</p>
  `;

  try {
    transporter.sendMail({
      to: RECIPIENT_EMAIL,
      subject: EMAIL_TITLE,
      html: message,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err, message);
    Sentry.captureException(err);
    Sentry.captureMessage(
      `Повідомлення з форми зворотнього зв'язку яке не вдалося надіслати\n${message}`
    );
  }
};

export default emailSender;
