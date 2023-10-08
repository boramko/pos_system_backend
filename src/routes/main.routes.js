module.exports = app => {
  const authenticate = require("../middleware/authenticate");
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  router.post("/signup", auth.signup);
  router.post("/login", auth.login);
  // router.post("/checkToken", auth.checkToken);
  router.post("/userInfo", [authenticate, auth.userInfo]);

  app.use('/api', router);
};