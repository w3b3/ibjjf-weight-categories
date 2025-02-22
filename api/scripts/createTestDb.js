require('dotenv').config({ path: '.env.test' });
const { Sequelize } = require('sequelize');

async function createTestDatabase() {
  const adminSequelize = new Sequelize('postgres', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  });

  try {
    // Drop the test database if it exists
    await adminSequelize.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`);
    // Create a new test database
    await adminSequelize.query(`CREATE DATABASE ${process.env.DB_NAME};`);
    console.log('Test database created successfully');
  } catch (error) {
    console.error('Error creating test database:', error);
    process.exit(1);
  } finally {
    await adminSequelize.close();
  }
}

createTestDatabase();
