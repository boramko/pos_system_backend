const tokenService = require("../utils/token");

function authenticate(req, res, next) {
  console.log(req);
  const authorizationHeader = req.get("Authorization");
  
  if (!authorizationHeader) {
    return res.status(401).json("Authorization header is missing");
  }
  
  // "Bearer <token>" 형식 검사
  if (!authorizationHeader.startsWith("Bearer ") || authorizationHeader.length <= 7) {
    return res.status(400).json("Invalid Authorization header format. Expected 'Bearer <token>'");
  }
  
  const token = authorizationHeader.substring(7); // "Bearer " 이후의 문자열을 추출
  try {
    const decodedToken = tokenService.verifyToken(token);
    req.token = decodedToken;
    next();
  } catch (error) {
    if (error.message === 'Token has expired') {
      return res.status(401).json('인증이 만료되었습니다. 새로고침 해주세요.');
    }
    return res.status(401).json('Invalid token');
  }
}  

module.exports = authenticate;
