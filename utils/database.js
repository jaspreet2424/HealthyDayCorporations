const mongoose = require('mongoose');
require('dotenv').config();

const databaseConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected Successfully`);
    } catch (error) {
        console.log(`Failed to Connect to database : ${error.message}`)
    }
}

module.exports = {
    databaseConnection,
}