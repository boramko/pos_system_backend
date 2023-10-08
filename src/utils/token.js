const tokenConfig = require('./token.config');
const jwt = require("jsonwebtoken");

//토큰 생성
function buildToken(subject, payload = {}) {
  const {options, secret} = tokenConfig.getSigningConfig(subject);
  return jwt.sign(payload, secret, options);
}

//토큰 유효성 검사 
function verifyToken(token) {
  const { options, secret } = tokenConfig.getVerifyConfig();
  console.log(options, secret);
  try {
    return jwt.verify(token, secret, options);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    console.log(err);
    return null;
  }
}

module.exports = {
  buildToken,
  verifyToken,
};