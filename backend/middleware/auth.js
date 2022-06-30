const jwt = require("jsonwebtoken");

const auth =
  ({ block }) =>
  (req, res, next) => {
    console.log("authenticating...");
    const token = req.headers.authorization;
    if (!token && block) return res.status(401).send("Missing token");

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err && block) res.status(401).send("Token error");
      res.locals.user = payload;
    });

    next();
  };

module.exports = auth;

/*

*/
