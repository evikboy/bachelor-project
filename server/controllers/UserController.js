const conf = require('../config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret, expiresIn } = conf.jwt
const { User } = require('../models')
const { errorWrapper, errorGenerator } = require('../errors')

const login = errorWrapper(async (req, res) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) errorGenerator({ statusCode: 401, message: 'Невірна адреса пошти або пароль'})
            
    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) errorGenerator({ statusCode: 401, message: 'Невірна адреса пошти або пароль'})
        
    const token = jwt.sign(
        { userId: existingUser._id, username: existingUser.username, email: existingUser.email }, 
        secret,
        { expiresIn: expiresIn }
    )

    return res.status(200).json({ 
        user: existingUser,
        token: `Bearer ${token}`
    })
})

const register = errorWrapper(async (req, res) => {
    const { email, username, password } = req.body
    const existingEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })
  
    if (existingEmail) errorGenerator({ statusCode: 409, message: 'Пошта все зайнята. Спробуйте іншу'})

    if (existingUsername) errorGenerator({ statusCode: 409, message: 'Логін вже зайнятий. Спробуйте інший'})
        
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        email,
        username,
        password: hashedPassword
    })

    const savedUser = await newUser.save()

    const token = jwt.sign(
        { userId: newUser._id, username: newUser.username, email: newUser.email }, 
        secret,
        { expiresIn: expiresIn }
    )

    return res.status(201).json({
        user: savedUser,
        token: `Bearer ${token}`
    })
})

const getMe = errorWrapper(async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) errorGenerator({ statusCode: 404, message: "Користувач не знайдений"})

    const token = jwt.sign(
        { userId: user._id, username: user.username, email: user.email }, 
        secret,
        { expiresIn: expiresIn }
    )

    return res.status(200).json({
        user: user,
        token: token
    })
})

module.exports = {
    login,
    register,
    getMe
}