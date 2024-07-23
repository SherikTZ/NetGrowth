const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};

export default { logout };
