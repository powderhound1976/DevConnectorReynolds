const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
  const token = req.headers['x-auth-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));
    req.user = decoded.user;
    next();
  }
  catch (err) {
    return res.status(401).json({ msg: 'Invalid token.' });
  }
};