const conf = require('./config')
const { host, port } = conf.nodejs
const app = require('./app')
const db = require('./helpers/db')

const start = async () => {
    server = app.listen(port, host, () => {
        console.log(`Server started: http://${host}:${port}`)
    })

    server.on('error', async (err) => {
        console.error('Server error:', err)
        await db.disconnect()
        process.exit(1)
    })

    await db.connect()
}

start()