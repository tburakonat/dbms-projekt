import nodemailer from "nodemailer";
import { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD } from "./config.js";

export const sendEmail = async (email, subject, resetLink) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: SENDER_EMAIL_ADDRESS,
				pass: SENDER_EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: SENDER_EMAIL_ADDRESS,
			to: email,
			subject: subject,
			html: `
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="UTF-8" />
						<meta name="viewport" content="width=device-width, initial-scale=1.0" />
						<style>
							body {
								font-family: Arial, sans-serif;
								background-color: #f4f4f4;
								margin: 0;
								padding: 20px;
							}
							.container {
								background-color: #ffffff;
								padding: 20px;
								border-radius: 5px;
								box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
							}
							.header {
								text-align: center;
								margin-bottom: 20px;
							}
							.content {
								text-align: left;
							}
							.footer {
								text-align: center;
								margin-top: 20px;
							}
							a {
								color: #007bff;
								text-decoration: none;
							}
							a:hover {
								text-decoration: underline;
							}
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h1>Reset Your Password</h1>
							</div>
							<div class="content">
								<p>Hello,</p>
								<p>
									We received a request to reset your password. Click the link
									below to choose a new password:
								</p>
								<p><a href="${resetLink}">Reset Password</a></p>
								<p>
									If you did not request a password reset, please ignore this
									email.
								</p>
								<p>Thank you!</p>
							</div>
							<div class="footer">
								<p>&copy; School Learning Platform. All rights reserved.</p>
							</div>
						</div>
					</body>
				</html>`,
		});

		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
};
