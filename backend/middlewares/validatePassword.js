const validatePassword = (req, res, next) => {
  const password = req.body.password;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const passwordCriteria = [
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
    {
      regex: /[A-Z]/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      regex: /[a-z]/,
      message: "Password must contain at least one lowercase letter",
    },
    { regex: /[0-9]/, message: "Password must contain at least one number" },
    {
      regex: /[!@#\$%\^&\*]/,
      message: "Password must contain at least one special character",
    },
  ];

  for (const criterion of passwordCriteria) {
    if (!criterion.regex.test(password)) {
      return res.status(400).json({ message: criterion.message });
    }
  }

  next();
};

export default validatePassword;
