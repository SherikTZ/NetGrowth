import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_VERIFIED_EMAIL = process.env.SENDGRID_VERIFIED_EMAIL;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: SENDGRID_VERIFIED_EMAIL,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    return {
      success: false,
      message: "Failed to send email",
      error: error.message,
    };
  }
};

export default sendEmail;
