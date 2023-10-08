module.exports = (sequelize, Sequelize) => {
    const CATEGORY = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false, // createdAt, updatedAt 필드 없이 정의
        freezeTableName: true // 테이블 이름을 모델 이름과 동일하게 사용
    });

    return CATEGORY;
};
