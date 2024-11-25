const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, String(process.env.JWT_SECRET), {
    expiresIn: "1h",
  });
};

module.exports = generateAccessToken;