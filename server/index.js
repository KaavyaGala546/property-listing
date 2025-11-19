const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/cart', require('./routes/cart'));

app.get('/', (req, res) => res.send({ ok: true, message: 'Kavya Capstone API' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
