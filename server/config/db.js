const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kavyacapstone';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      // useUnifiedTopology: true, // This line is removed based on the provided Code Edit
    });
    console.log('-------------------------------------------');
    console.log('✅ MongoDB Connected Safely');
    console.log('🏠 Project: Property Listing Platform');
    console.log('-------------------------------------------');
  } catch (err) {
    console.error('MongoDB connection error:', err.message); // Keep original error log
    process.exit(1); // Uncommented and moved based on the provided Code Edit
  }
};

module.exports = connectDB;
