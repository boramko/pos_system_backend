require('dotenv').config({path: '../../.env'})
/**
 *  config.rsaPrivateKey: 이것은 서버의 RSA 개인 키입니다. 이 키는 비밀로 유지되어야 하며, 이 키를 사용하여 JWT 토큰을 서명합니다.   
    config.rsaPublicKey: 이것은 서버의 RSA 공개 키입니다. 이 키는 공개될 수 있으며, 이 키를 사용하여 서명된 JWT 토큰을 검증합니다.
    config.hmacSecret: 이것은 HMAC 알고리즘을 사용하여 JWT 토큰을 서명하고 검증할 때 사용되는 비밀 키입니다.
 */

const defaultSignOptions = {
    expiresIn: 15 * 60, // expires in 15min
  };
  
  const hmacSignOptions = {
      algorithm: 'HS256',
      ...defaultSignOptions
  }
  
  const hmacVerifyOptions = {
    algorithms: ["HS256"], 
  };
  
  const rsaSignOptions = {
      algorithm: 'RS256',
      ...defaultSignOptions
  }
  
  function getSigningConfig(subject) {
    console.log(process.env.JWT_RSA_PRIVATE_KEY)
      if (process.env.JWT_RSA_PRIVATE_KEY) {
          return {
              options: {...rsaSignOptions, subject},
              secret: process.env.JWT_RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
          };
      }
      return {
          options: {...hmacSignOptions, subject},
          secret: process.env.JWT_HMAC_SECRET,
      }
  }
  
  function getVerifyConfig(subject) {
      if (process.env.JWT_RSA_PRIVATE_KEY) {
          return {
              options: {algorithms: ["RS256"]},
              secret: process.env.JWT_RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
          };
      }
      return {
          options: hmacVerifyOptions,
          secret: process.env.JWT_HMAC_SECRET,
      }
  }
  
  module.exports = {
      getVerifyConfig,
      getSigningConfig,
  }