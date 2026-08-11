const User = require('../models/user-model')

const adminmiddleware = async function(req, res, next) {

    const user = await User.findById(req.user.userId)

    if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
    }

    if (user.role !== 'admin') {
        return res.status(403).json({
            message: 'Sorry, access has been denied'
        })
    }

    next()
}

module.exports = adminmiddleware