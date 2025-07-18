const request = require('supertest');
const mongoose = require('mongoose');
const { createApp } = require('../server');
const Bug = require('../models/Bug');
const { connectDB, disconnectDB } = require('./testDb');

// Create app instance for testing
const app = createApp();

describe('Bug Tracker API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await Bug.deleteMany({});
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug', async () => {
      const res = await request(app)
        .post('/api/bugs')
        .send({
          title: 'Login not working',
          description: 'Cannot login with valid credentials',
          priority: 'high'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.title).toBe('Login not working');
      expect(res.body.message).toBe('Bug created successfully');
    });

    it('should return 400 for missing title', async () => {
      const res = await request(app)
        .post('/api/bugs')
        .send({
          description: 'Missing title field'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('GET /api/bugs', () => {
    it('should get all bugs', async () => {
      await Bug.create([
        { title: 'Bug 1', description: 'Description 1' },
        { title: 'Bug 2', description: 'Description 2' }
      ]);

      const res = await request(app).get('/api/bugs');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(2);
    });
  });

  describe('PUT /api/bugs/:id', () => {
    it('should update a bug', async () => {
      const bug = await Bug.create({
        title: 'Original Title',
        description: 'Original Description'
      });

      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send({ title: 'Updated Title' });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.data.title).toBe('Updated Title');
    });

    it('should return 404 for invalid id', async () => {
      const res = await request(app)
        .put('/api/bugs/507f1f77bcf86cd799439011')
        .send({ title: 'Updated Title' });
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    it('should delete a bug', async () => {
      const bug = await Bug.create({
        title: 'To be deleted',
        description: 'This bug will be deleted'
      });

      const res = await request(app).delete(`/api/bugs/${bug._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body.message).toBeDefined();

      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });
  });
});