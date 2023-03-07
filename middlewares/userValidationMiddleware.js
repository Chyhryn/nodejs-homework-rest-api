const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "options") {
    next();
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const tokenFromHeaders = req.headers.authorization;
    if (!tokenFromHeaders) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!tokenFromHeaders.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const authToken = tokenFromHeaders.split(" ")[1];
    const decoded = jwt.verify(authToken, secretKey);
    const id = decoded.data;
    req.user = id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};
