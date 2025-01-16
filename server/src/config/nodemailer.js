/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

// Configuration
dotenv.config();

// Transporter Configuration
const transporter = nodemailer.createTransport({
    // brevo smtp
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Export
export default transporter;