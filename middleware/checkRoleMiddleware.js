// @ts-nocheck
const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Not authorization!!!" });
      }
      const decoded = jwt.verify(token, "lkfsalfknvsdirrwesdkldjf");
      if (decoded.role !== role) {
        return res.status(401).json({ message: "Not success!!!" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorization!!!" });
    }
  };
};
