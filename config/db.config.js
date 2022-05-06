const mongoose = require('mongoose');

const connectDb = async () => {
    const connectionDb = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB! database name: ${connectionDb.connections[0].name}`);
}

module.exports = connectDb;