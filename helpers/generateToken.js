const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function generateToken(data) {
  const dataForToken = { data };
  return jwt.sign(dataForToken, secretKey, { expiresIn: "2h" });
}

module.exports = generateToken;
