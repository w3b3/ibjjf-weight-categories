module.exports = (sequelize, Sequelize) => {
    const Professor = sequelize.define("professor", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
             validate: {
                notEmpty: true,
            }
        },
        photo: {
            type: Sequelize.STRING,
            allowNull: true
        },
        belt: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['Brown', 'Black']], // Only Brown and Black belts can be professors
            }
        },
        stripe: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
              min: 0,
              max: 4
            }
        }
    });
    return Professor;
};