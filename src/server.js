const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

const router = require("./routes/main.routes");
const productRouter = require("./routes/product.routes");
const paymentRouter = require("./routes/payment.routes");

// CORS options - consider tightening this up for production use.
var corsOptions = {
  // [!] Replace this with the exact origin in production!
  // origin: `${process.env.ALLOWFRONT_SERVER}`,
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res) {
  res.sendFile(__dirname + "/public/main.html")
});

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

// HTTP Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
