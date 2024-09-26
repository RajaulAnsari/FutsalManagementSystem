const jwt = require("jsonwebtoken");
const SECRET_KEY = "bffyrgesfygawr47r7347r48rrcn83e3e732e";

function authToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  // console.log(token);

  if (!token) {
    return res.status(401).json("Acccess Denied : No token Provided");
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (e) {
    res.status(400).json("Invalid Token");
  }
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json("Access Denied : Insufficient Permission");
    }
    next();
  };
}
module.exports = {
  authToken,
  authRole,
};
