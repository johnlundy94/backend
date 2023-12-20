const jwt = require("jsonwebtoken");

function generateToken(user) {
  if (!user) {
    return null;
  }

  const userInfo = {
    username: user.username,
    email: user.email,
  };

  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

module.exports.generateToken = generateToken;
