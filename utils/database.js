const mongoose = require('mongoose');

const databaseConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://healthydaycorporations:HealthyDayCorporations@healthydaycluster.0w1cs.mongodb.net/');
        console.log(`Database Connected Successfully`);
    } catch (error) {
        console.log(`Failed to Connect to database : ${error.message}`)
    }
}

module.exports = {
    databaseConnection
}