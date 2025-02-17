module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        photo: {
            type: Sequelize.STRING, // URL to an image
            allowNull: true, // Can be optional
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 4, // Example minimum age
            }
        },
        weight: {
            type: Sequelize.FLOAT,
            allowNull: false,
             validate: {
                isFloat: true,
                min: 0,
            }
        },
        belt: { // Added belt rank
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'White', // Default to white belt
            validate: {
                isIn: [['White', 'Grey', 'Yellow', 'Orange', 'Green', 'Blue', 'Purple', 'Brown', 'Black']], //Valid belts
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

    return Student;
};