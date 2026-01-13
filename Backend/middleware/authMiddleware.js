const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Token exist karta hai?
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Bearer TOKEN_STRING
    const token = authHeader.split(" ")[1];

    // 3️⃣ Token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ User data request ke sath attach
    req.user = decoded;

    next(); // route ko allow
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
