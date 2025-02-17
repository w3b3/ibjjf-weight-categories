module.exports = (sequelize, Sequelize) => {
    const Checkin = sequelize.define("checkin", {
        checkinTime: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });
    return Checkin;
}