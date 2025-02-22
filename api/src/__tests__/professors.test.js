const request = require('supertest');
const app = require('../app');
const db = require('../models');

const API_KEY = process.env.API_KEY || 'test-api-key';

describe('Professor Endpoints', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('POST /api/professors', () => {
    it('should create a new professor', async () => {
      const res = await request(app)
        .post('/api/professors')
        .set('x-api-key', API_KEY)
        .send({
          name: 'Master Silva',
          email: 'silva@example.com',
          belt: 'black',
          stripes: 3
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Master Silva');
    });
  });

  describe('GET /api/professors', () => {
    it('should get all professors', async () => {
      const res = await request(app)
        .get('/api/professors')
        .set('x-api-key', API_KEY);
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});
