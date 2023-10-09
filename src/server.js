const fs = require('fs'); // fs 모듈을 불러옴
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// 경로가 절대 경로로 지정되어 있으니, 상대 경로나 정확한 경로를 사용해 주세요.
const router = require("./routes/main.routes"); 
const productRouter = require("./routes/product.routes"); 
const paymentRouter = require("./routes/payment.routes");

const path = require('path');
const keyPath = path.resolve(__dirname, '../pem/_wildcard.example.dev+3-key.pem');
const certPath = path.resolve(__dirname, '../pem/_wildcard.example.dev+3.pem');

var corsOptions = {
  origin: `${process.env.ALLOWFRONT_SERVER}:${process.env.LOCALPORT || 8080}`,
  credentials: true,
  optionsSuccessStatus: 200,
};

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

console.log(app);
router(app);
productRouter(app);
paymentRouter(app);
// app.use('/api', router);

const PORT = process.env.LOCALPORT || 8080;

// Express 앱을 https 서버에 바인딩
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}.`);
    response.setHeader('Access-Control-Allow-origin', `${process.env.ALLOWFRONT_SERVER}`); // 모든 출처(orogin)을 허용
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // 모든 HTTP 메서드 허용
    response.setHeader('Access-Control-Allow-Credentials', 'true'); // 클라이언트와 서버 간에 쿠키 주고받기 허용
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('ok');
});
