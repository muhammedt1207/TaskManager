const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("🚀 ~ authenticateUser ~ token:", token)

  if (!token) {
    return next(createError(401, "No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError(401, "Invalid token"));
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
