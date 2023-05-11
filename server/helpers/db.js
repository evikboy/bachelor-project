const conf = require('../config')
const mongoose = require('mongoose')

const connect = async () => {
    const uri = `mongodb://${conf.mongodb.username}:${conf.mongodb.password}@` +
    `${conf.mongodb.host}:${conf.mongodb.port}/${conf.mongodb.dbName}`

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        await mongoose.connect(uri, options)
        console.log(`Connected to database successfully: ${uri}`)
    } catch(err) {
        console.error('Failed to connect to database:', err)
    }
}

const disconnect = async () => {
    try {
        const state = mongoose.connection.readyState
        if (state === 0) return

        await mongoose.disconnect()
        console.log(`Disconnected from database successfully`)
    } catch(err) {
        console.error('Failed to disconnect from database: ', err)
    }
}

module.exports = { connect, disconnect }