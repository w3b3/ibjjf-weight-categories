module.exports = (sequelize, Sequelize) => {
    const Gym = sequelize.define('gym', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
              validate: {
                notEmpty: true
            }
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isEmail: true,
          }
        },
    });
    return Gym;
};