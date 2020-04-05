const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: 'unauthorized',
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, process.env.JWT_SECRET, (err, encoded) => {
    if (err) {
      return res.status(401).json({
        error: err.message,
      });
    }

    req.userId = encoded.id;

    return next();
  });
};