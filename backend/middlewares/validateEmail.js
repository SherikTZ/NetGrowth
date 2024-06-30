const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  next();
};

export default validateEmail;
