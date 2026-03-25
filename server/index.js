const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// connect to DB
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/recommendations', require('./routes/recommendations'));

app.get('/', (req, res) => res.send({ ok: true, message: 'Property Listing API' }));

app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🚀 Property Listing API Server running on port ${PORT}`);
  console.log('-------------------------------------------');
});
