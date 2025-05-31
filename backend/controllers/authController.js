const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Auth.create({ name, email, password: hashedPassword });
    // const token = jwt.sign(
    //   {
    //     name: user.name,
    //     id: user.id,
    //   },
    //   process.env.SECRET_KEY,
    //   { expiresIn: "1d" }
    // );

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    // });
    console.log("signup is successful", req.session.user);
    return res.status(201).json({
      message: "signup is successful",
      user: req.session.user,
    });
  } catch (error) {
    console.log("error in signup", error);
    return res.status(500).json({ message: " Internel server error" });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await Auth.findOne({ email });
    if (!checkUser) {
      return res.status(500).json({ message: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.status(500).json({ message: "password is incorrect" });
    }
    // const token = jwt.sign({ name: checkUser.name }, process.env.SECRET_KEY, {
    //   expiresIn: "1d",
    // });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'Strict',
    // });

    req.session.user = {
      id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
    };

    req.session.save();
    console.log("login  successful", req.session.user);
    return res.status(200).json({
      message: "login successful",
      user: req.session.user,
    });
  } catch (error) {
    console.log("error in login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout successful" });
  });
};
