const request = require('supertest');
const app = require('../app');
const db = require('../models');

const API_KEY = process.env.API_KEY || 'test-api-key';

describe('Checkin Endpoints', () => {
  let student;
  let class1;

  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    
    // Create test data
    student = await db.Student.create({
      name: 'Test Student',
      email: 'student@test.com',
      belt: 'white',
      stripes: 0
    });

    const professor = await db.Professor.create({
      name: 'Test Professor',
      email: 'prof@test.com',
      belt: 'black',
      stripes: 0
    });

    const gym = await db.Gym.create({
      name: 'Test Gym',
      address: '123 Test St'
    });

    class1 = await db.Class.create({
      name: 'Test Class',
      startTime: '18:00',
      endTime: '19:00',
      dayOfWeek: 'Monday',
      professorId: professor.id,
      gymId: gym.id
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe('POST /api/checkins', () => {
    it('should create a new checkin', async () => {
      const res = await request(app)
        .post('/api/checkins')
        .set('x-api-key', API_KEY)
        .send({
          studentId: student.id,
          classId: class1.id
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.studentId).toBe(student.id);
    });
  });

  describe('GET /api/checkins', () => {
    it('should get all checkins', async () => {
      const res = await request(app)
        .get('/api/checkins')
        .set('x-api-key', API_KEY);
      
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });
});
