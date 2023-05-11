const conf = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { User } = require('../models')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: conf.jwt.secret
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId)

                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch(err) {
                return done(err, false)
            }
        })
    )
}