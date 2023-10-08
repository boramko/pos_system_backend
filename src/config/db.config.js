const fs = require('fs'); // fs 모듈을 불러옴
require('dotenv').config()

const path = require('path');
const keyPath = path.resolve(__dirname, '../../pem/_wildcard.example.dev+3-key.pem');
const certPath = path.resolve(__dirname, '../../pem/_wildcard.example.dev+3.pem');

module.exports = {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PW, 
    DB: process.env.DATABASE_NAME,
    dialect: "mysql",
    key : fs.readFileSync(keyPath),
    cert : fs.readFileSync(certPath),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};