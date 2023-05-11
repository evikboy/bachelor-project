require('dotenv').config()

module.exports = {
    log_level: process.env.LOG_LEVEL || 'dev',
    "nodejs": {
        host: process.env.APP_HOST || 'localhost',
        port: process.env.APP_PORT || 3001,
    },
    "mongodb": {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        dbName: process.env.DB_NAME || 'forumdb',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'rootpass'
    },
    "jwt": {
        secret: process.env.JWT_SECRET || 'd5493ebc04db681fe34c67a9af018a8d08ef53775490f8a7f72bcb1687bd867f',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    }
}