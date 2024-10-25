import { PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js';
import { mailtrapClient, sender } from './mailtrap.config.js';


export const sendVerificationEmail = async (email, verificationToken) => {
    // Make sure 'email' is correctly assigned to the recipient object
    const recipient = [{ email: "arunmsdfan420@gmail.com", }]; 

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async(email,name) => {
    const recipient = [{ email : "arunmsdfan420@gmail.com "}]

    try{

       const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid:"b492ce2b-8b7d-4fa4-ac8a-47d55920f05a",
            template_variables:{
                 company_info_name: "Techist Company",
                name: "name",
                  
            },
        });

        console.log("Email sent welcome successfully", response)

    }catch (error){

        console.log.error(` Error sending welcome Email`, error);

        throw new Error(`Error sending welcome email: ${error}`);
    }
};
export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email: "arunmsdfan420@gmail.com" }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};
export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email:"arunmsdfan420@gmail.com" }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};
