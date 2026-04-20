const User = require("../models/User");

// ✅ REGISTER
exports.register = async (req, res) => {
  let { name, phone, email, password } = req.body;

  name = name?.trim();
  phone = phone?.trim();
  email = email?.trim();
  password = password?.trim();

  if (!name || !phone || !email || !password) {
    return res.status(400).send("All fields required");
  }

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).send("Phone must be 10 digits");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send("Invalid email");
  }

  const passwordRegex = /^[A-Z].{7,}\d{2}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).send(
      "Password must be min 10 chars, start with capital, end with 2 numbers"
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new User({ name, phone, email, password });
    await newUser.save();

    res.send("Registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  let { email, password } = req.body;

  email = email?.trim();
  password = password?.trim();

  if (!email || !password) {
    return res.status(400).send("Email & Password required");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid password");
    }

    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};