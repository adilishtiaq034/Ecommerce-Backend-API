const jwt = require('jsonwebtoken')

const authmiddlware = function(req,res,next){

    try{
const header = req.headers['authorization']
if(!header){
    return res.status(401).json({
        message: 'Authorization header missing'
    })}

    const token = header.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message: 'Token missing'
        })
    }
    const decoded = jwt.verify(token,process.env.jwt_secret)
    req.user = decoded
    next()
    }
    catch(err){
        res.status(401).json({
            message: 'Invalid token'
        })
    }
}