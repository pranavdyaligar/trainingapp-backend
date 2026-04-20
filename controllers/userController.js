const User = require("../models/User");

// REGISTER
exports.register = async (req, res) => {
  let { name, phone, email, password } = req.body;

  name = name?.trim();
  phone = phone?.trim();
  email = email?.trim();
  password = password?.trim();

  if (!name || !phone || !email || !password) {
    return res.status(400).send("All fields required");
  }

  // PHONE
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).send("Phone must be 10 digits");
  }

  // EMAIL
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send("Invalid email");
  }

  // PASSWORD RULE (ONLY FOR REGISTER)
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

    res.send("Registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;

  email = email?.trim();
  password = password?.trim();

  if (!email || !password) {
    return res.status(400).send("Email & Password required");
  }

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send(user);
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
};