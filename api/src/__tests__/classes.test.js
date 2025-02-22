const request = require('supertest');
const app = require('../app');
const db = require('../models');

const API_KEY = process.env.API_KEY || 'test-api-key';

describe('Class Endpoints', () => {
  let professor;
  let gym;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    
    // Create test professor and gym
    professor = await db.Professor.create({
      name: 'Test Professor',
      email: 'prof@test.com',
      belt: 'black',
      stripes: 0
    });

    gym = await db.Gym.create({
      name: 'Test Gym',
      address: '123 Test St'
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('POST /api/classes', () => {
    it('should create a new class', async () => {
      const res = await request(app)
        .post('/api/classes')
        .set('x-api-key', API_KEY)
        .send({
          name: 'Fundamentals',
          startTime: '18:00',
          endTime: '19:00',
          dayOfWeek: 'Monday',
          professorId: professor.id,
          gymId: gym.id
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Fundamentals');
    });
  });

  describe('GET /api/classes', () => {
    it('should get all classes', async () => {
      const res = await request(app)
        .get('/api/classes')
        .set('x-api-key', API_KEY);
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});
