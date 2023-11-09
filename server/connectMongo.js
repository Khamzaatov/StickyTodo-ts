const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Success Mongo')
    } catch (error) {
        console.log('Error!!!' + error.message)
    }
}

module.exports = connectDB