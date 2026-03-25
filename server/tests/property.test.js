const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const propertyRoutes = require('../routes/properties');
const Property = require('../models/Property');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/api/properties', propertyRoutes);
});

afterAll(async () => {
  await Property.deleteMany({});
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Property API', () => {
  beforeEach(async () => {
    await Property.deleteMany({});
  });

  it('should fetch all properties', async () => {
    await Property.create({
      title: 'Test House',
      location: 'Test City',
      price: '$1,000,000',
      type: 'House'
    });

    const res = await request(app).get('/api/properties');
    expect(res.statusCode).toEqual(200);
    expect(res.body.properties.length).toBeGreaterThan(0);
    expect(res.body.properties[0].title).toBe('Test House');
  });

  it('should fetch a single property by ID', async () => {
    const prop = await Property.create({
      title: 'Single House',
      location: 'Test City',
      price: '$500,000'
    });

    const res = await request(app).get(`/api/properties/${prop._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Single House');
  });

  it('should return 404 for non-existent property', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/properties/${fakeId}`);
    expect(res.statusCode).toEqual(404);
  });
});
