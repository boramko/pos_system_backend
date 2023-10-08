module.exports = (sequelize, Sequelize) => {
    const MENU = sequelize.define("menu", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cateIds: {
            type: Sequelize.JSON, // JSON 타입으로 cateIds 저장
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        options: {
            type: Sequelize.JSON, // JSON 타입으로 options 저장
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

    return MENU;
};
