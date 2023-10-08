module.exports = app => {
    const authenticate = require("../middleware/authenticate");
    const payment = require("../controllers/payment.controller.js");
    var router = require("express").Router();
  
    //결제저장
    router.post('/payment', [authenticate, payment.createPayment] );

    //결제 전체 조회 
    router.get('/payment', [authenticate, payment.getPayments] );

    //결제 특정아이디 조회 
    router.get('/payment/:id', [authenticate, payment.getPaymentsByUserId] );

    //결제 수정
    router.put('/payment/:id', [authenticate, payment.updatePayment]);

    //결제 정보 삭제 
    router.delete('/payment/:id', [authenticate, payment.deletePayment]);

    app.use('/api', router);
  };