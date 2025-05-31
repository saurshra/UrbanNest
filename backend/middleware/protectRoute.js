// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// const protectRoute = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "token not found" });
//   }
//   try {
//     const decode = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decode;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

// exports.logout = (req, res) => {
//   res.cookie("token", "", { maxAge: 1 });
//   res.json({ message: "Logged out successfully" });
// };

// module.exports = protectRoute;


const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized! Please log in." });
  }
};
module.exports = isAuthenticated;

