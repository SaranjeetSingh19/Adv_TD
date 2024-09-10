import bcryptjs from "bcryptjs";
import signToken from "../auth/user.auth.js";
import User from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });
  await user.save();

  const token = signToken(user._id);
  res.json({ success: true, message: "User created successfully" , token});
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isValidPassword = await bcryptjs.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user._id);
  res.json({ success: true, message: "Login successful" , token});
};

export { registerUser, loginUser };
