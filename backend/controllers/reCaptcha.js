import axios from "axios";

const verifyRecaptcha = async (req, res) => {
  const { captcha } = req.body;
  const secretKey = process.env.RE_CAPTCHA_SECRET_KEY;

  if (!captcha) {
    return res.json({ success: false, message: "No reCAPTCHA token provided" });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: secretKey,
          response: captcha,
        },
      }
    );

    const data = response.data;

    if (data.success) {
      return res.json({
        success: true,
        message: "reCAPTCHA validation succeeded",
      });
    } else {
      return res.json({
        success: false,
        message: "reCAPTCHA validation failed",
      });
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error verifying reCAPTCHA" });
  }
};

export default { verifyRecaptcha };
