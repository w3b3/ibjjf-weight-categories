module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("class", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        schedule: {
            type: Sequelize.STRING, // e.g., "Mon/Wed/Fri 6:00 PM"
            allowNull: false,
             validate: {
                notEmpty: true
            }
        },
        type: {
          type: Sequelize.ENUM('Kids', 'Adults', 'All Levels', "Competition", "Open Mat", "Fundamentals"),
          allowNull: false
        }

    });
    return Class;
};