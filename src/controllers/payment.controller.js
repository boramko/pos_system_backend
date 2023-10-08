const moment = require('moment-timezone');
const db = require("../models");
const Payment = db.PAYMENT;

// 결제 생성
exports.createPayment = async (req, res) => {
    try {
        // req.body에서 datainfo를 추출하고, 이를 다시 구조 분해 할당하여 변수로 사용합니다.
        const { datainfo: { transactionId, orderId, status, amount, paymentDetails, payerName, payerId } } = req.body;
        
        const payment = await Payment.create({
            transactionId,
            orderId,
            status,
            amount,
            paymentDetails,
            payerName,
            payerId,
            paymentDate : new Date()
        });
        res.status(201).send(payment);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

// 결제 전체 조회
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        const paymentsWithKST = payments.map(payment => {
            payment.dataValues.createdAt = moment(payment.createdAt).tz('Asia/Seoul').format();
            payment.dataValues.paymentDate = moment(payment.paymentDate).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
            payment.dataValues.updatedAt = moment(payment.updatedAt).tz('Asia/Seoul').format();
            return payment;
        });
        res.status(200).send(paymentsWithKST);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// 결제: 사용자 ID로 조회
exports.getPaymentsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const payments = await Payment.findAll({ where: { payerId: userId } });
        if (payments && payments.length > 0) {
            const paymentsWithKST = payments.map(payment => {
                payment.dataValues.createdAt = moment(payment.createdAt).tz('Asia/Seoul').format();
                payment.dataValues.paymentDate = moment(payment.paymentDate).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
                payment.dataValues.updatedAt = moment(payment.updatedAt).tz('Asia/Seoul').format();
                return payment;
            });
            res.status(200).send(paymentsWithKST);
        } else {
            res.status(404).send({ message: "Payments not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

// 결제 수정
exports.updatePayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const updatedPayments = await Payment.update({
            status: '취소'
        }, {
            where: {
                orderId,
                status: '승인' // Only update if current status is '승인'
            }
        });
        // updatedPayments[0] will contain the number of affected rows
        if (updatedPayments[0] > 0) {
            res.status(200).send({ message: "Payment(s) updated successfully" });
        } else {
            res.status(404).send({ message: "No approved payment found with provided orderId" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


// 결제 삭제
exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.destroy({
            where: { id }
        });
        if (payment === 1) {
            res.status(200).send({ message: "Payment deleted successfully" });
        } else {
            res.status(404).send({ message: "Payment not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
