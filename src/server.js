const fs = require('fs');
const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

const router = require("./routes/main.routes");
const productRouter = require("./routes/product.routes");
const paymentRouter = require("./routes/payment.routes");

// HTTPS key files
// [!] Ensure these paths and files are correct and have proper read permissions.
const keyPath = path.resolve(__dirname, '../pem/_wildcard.example.dev+3-key.pem');
const certPath = path.resolve(__dirname, '../pem/_wildcard.example.dev+3.pem');

// CORS options - consider tightening this up for production use.
var corsOptions = {
  // [!] Replace this with the exact origin in production!
  origin: `${process.env.ALLOWFRONT_SERVER}`,
  credentials: true,
  optionsSuccessStatus: 200,
};

const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req,res) {
  res.sendFile(__dirname + "/public/main.html")
})

// [!] Be cautious with db sync in production!
const db = require("./models");
db.sequelize.sync();

// [!] Log details only as needed, especially in production.
// console.log(app);

// Routers
router(app);
productRouter(app);
paymentRouter(app);

// Port configuration
const PORT = process.env.LOCALPORT || 3000;

// HTTPS Server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}.`);
});
