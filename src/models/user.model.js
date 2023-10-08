module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        user_seq: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false, // 필수
            unique: true // 유니크한 값이어야 함
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: true, // null 허용
        },
        user_password: {
            type: Sequelize.STRING,
            allowNull: false // 필수
        },
        user_regdate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW // 현재 시간으로 기본값 설정
        },
        user_status: {
            type: Sequelize.STRING,
            defaultValue: 'u', // 기본값은 'u'
            validate: {
                isIn: [['u', 'a', 'd']] // 'u', 'a', 'd' 중 하나의 값이어야 함
            }
        }
    });

    return User;
};
