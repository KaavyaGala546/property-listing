/**
 * Simple seed script to import sample properties into MongoDB.
 * Usage: npm run seed (from server/)
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Property = require('../models/Property');

dotenv.config();

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kavyacapstone';

async function run() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB for seeding');

  const file = path.join(__dirname, '..', 'data', 'properties.json');
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);

  await Property.deleteMany({});
  await Property.insertMany(data.map(d => ({
    title: d.title,
    location: d.location,
    type: d.type,
    bedrooms: d.bedrooms,
    bathrooms: d.bathrooms,
    area: d.area,
    price: d.price,
    description: d.description,
    features: d.features,
    images: d.images
  })));

  console.log('Seeded properties');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
