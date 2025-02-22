const { Sequelize } = require('sequelize');
const config = require('../config/database');

// Get environment-specific config
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        logging: console.log
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Student = require('./student')(sequelize, Sequelize);
db.Professor = require('./professor')(sequelize, Sequelize);
db.Class = require('./class')(sequelize, Sequelize);
db.Gym = require('./gym')(sequelize, Sequelize);
db.Checkin = require('./checkin')(sequelize, Sequelize);

// Define associations
db.Professor.hasMany(db.Class, { foreignKey: 'professorId' });
db.Class.belongsTo(db.Professor, { foreignKey: 'professorId' });

db.Gym.hasMany(db.Class, { foreignKey: 'gymId' });
db.Class.belongsTo(db.Gym, { foreignKey: 'gymId' });

db.Student.belongsToMany(db.Class, { through: 'StudentClass' });
db.Class.belongsToMany(db.Student, { through: 'StudentClass' });

db.Student.hasMany(db.Checkin, { foreignKey: 'studentId' });
db.Checkin.belongsTo(db.Student, { foreignKey: 'studentId' });
db.Class.hasMany(db.Checkin, {foreignKey: 'classId'});
db.Checkin.belongsTo(db.Class, {foreignKey: 'classId'});

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Only alter tables instead of dropping/recreating
        await sequelize.sync({ 
            // alter: process.env.NODE_ENV === 'development',
            force: process.env.NODE_ENV === 'test'
        });
        
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
initializeDatabase();

module.exports = db;