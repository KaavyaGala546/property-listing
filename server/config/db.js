const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kavyacapstone';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      // useUnifiedTopology: true, // This line is removed based on the provided Code Edit
    });
    console.log('-------------------------------------------');
  } catch (err) {
    console.error('-------------------------------------------');
    console.error('❌ MongoDB Connection Failed');
    console.error(`Error: ${err.message}`);
    
    if (process.env.DB_MOCK_MODE === 'true') {
      console.warn('⚠️  DB_MOCK_MODE is ENABLED. Continuing without persistent DB.');
      console.warn('🚀 API remains online for UI/UX verification.');
    } else {
      console.error('🛑 Exiting process. Use DB_MOCK_MODE=true for local UI testing.');
      process.exit(1);
    }
    console.error('-------------------------------------------');
  }
};

module.exports = connectDB;
