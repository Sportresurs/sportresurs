import nodemailer from "nodemailer";
import * as Sentry from "@sentry/nextjs";
import { User } from "../models";

const { EMAIL_LOGIN, EMAIL_PASS, NEXTAUTH_URL } = process.env;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASS,
  },
});

const sendRequest = async (name, phoneNumber, details) => {
  const users = await User.findAll({ attributes: ["email"] });
  const emails = users.map((user) => user.dataValues.email);
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
      to: emails.join(", "),
      subject: EMAIL_TITLE,
      html: message,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err, message);
    Sentry.captureException(err);
    Sentry.captureMessage(
      `Повідомлення з форми зворотнього зв'язку яке не вдалося надіслати
      ${message}`
    );
  }
};

const sendInviteAdmin = (email) => {
  const message = `
    <p>Вас додали як адміністратора сайту Спортресурс.</p>
    <p>Посилання для входу в адмінку:</p>
    <a href="${NEXTAUTH_URL}login">${NEXTAUTH_URL}login</a>
    <p>Дякуємо!</p>
  `;

  try {
    transporter.sendMail({
      to: email,
      subject: "Вітаємо",
      html: message,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err, message);
    Sentry.captureException(err);
    Sentry.captureMessage(
      `Email який не вдалося надіслати
      ${message}`
    );
  }
};

export { sendRequest, sendInviteAdmin };
