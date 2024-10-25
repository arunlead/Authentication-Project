import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

console.log("Mailtrap Token:", process.env.MAILTRAP_TOKEN); // Add this line

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
