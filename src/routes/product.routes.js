module.exports = app => {
    const authenticate = require("../middleware/authenticate");
    const product = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // app.use("/api/product/menu",authenticate, auth.signup);
    // app.use("/api/product/categories", authenticate, auth.login);

    router.post('/menu', [authenticate,product.createMenu] );
    router.get('/menu', [authenticate,product.getMenus] );
    router.put('/menu/:id', [authenticate,product.updateMenu]);
    router.delete('/menu/:id', [authenticate,product.deleteMenu]);

    router.post('/category', [authenticate,product.createCategory]);
    router.get('/category', [authenticate,product.getCategories]);
    router.put('/category/:id', [authenticate,product.updateCategory]);
    router.delete('/category/:id', [authenticate,product.deleteCategory]);

    app.use('/api/product', router);
  };