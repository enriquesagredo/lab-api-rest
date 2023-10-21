const mongoose = require('mongoose')

const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apirest'

mongoose.connect(mongodbUri)
    .then(() => console.info(`Connected to the database`))
    .catch(error => console.error(`Failed to connect to the database`))