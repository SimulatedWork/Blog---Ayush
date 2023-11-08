const jwt = require("jsonwebtoken");

const authenticateToken = (req, resp, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return resp.status(401).json({ error: "Authorization Header is required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (e) {
    return resp.status(401).json({ error: "Invalid Token." });
  }
};

module.exports = authenticateToken;
