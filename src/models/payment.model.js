module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true, // 자동 증가 설정
            primaryKey: true
        },
        transactionId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        orderId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        status: {
            type: Sequelize.STRING, // 상태: '승인', '취소'
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        paymentDetails: {
            type: Sequelize.JSON, 
            allowNull: false
        },
        payerName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        payerId: {
            type: Sequelize.STRING,
            allowNull: false
        },
        paymentDate: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    }, {
        timestamps: true,
        freezeTableName: true
    });

    return Payment;
};
