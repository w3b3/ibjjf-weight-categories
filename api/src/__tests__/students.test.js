const request = require('supertest');
const app = require('../app');
const db = require('../models');

const API_KEY = process.env.API_KEY || 'test-api-key';

describe('Student Endpoints', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('POST /api/students', () => {
    it('should create a new student', async () => {
      const res = await request(app)
        .post('/api/students')
        .set('x-api-key', API_KEY)
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          belt: 'white',
          stripes: 0
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('John Doe');
    });
  });

  describe('GET /api/students', () => {
    it('should get all students', async () => {
      const res = await request(app)
        .get('/api/students')
        .set('x-api-key', API_KEY);
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});
