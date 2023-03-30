const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()


app.use(express.json())
app.use(cors())
app.use(require('./routes/todo.route'))
app.use(require('./routes/user.route'))

mongoose.set('strictQuery', false)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO)

        app.listen(process.env.PORT, () => {
            console.log(`Сервер запущен на порту ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error, 'Ошибка сервера!')
    }
}

start()

