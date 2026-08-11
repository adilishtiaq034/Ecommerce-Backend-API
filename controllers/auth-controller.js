const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')


const registerUser = async function (req, res, next) {

    const { name, email, password } = req.body

    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            })
        }

        const saltRounds = 10

        const hashedPassword = await bcrypt.hash(
            password,
            saltRounds
        )

        const registeredUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (!registeredUser) {
            return res.status(400).json({
                message: 'User registration failed'
            })
        }

        res.status(201).json({
            message: 'User registered successfully',
            name: registeredUser.name,
            email: registeredUser.email
        })

    } catch (err) {

        next(err)

    }
}


const loginUser = async function (req, res, next) {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.jwt_secret,
            {
                expiresIn: '7d'
            }
        )

        res.status(200).json({
            message: 'Login successful',
            token
        })

    } catch (err) {

        next(err)

    }
}


module.exports = {
    registerUser,
    loginUser
}