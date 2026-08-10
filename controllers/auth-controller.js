const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const registerUser = async function(req,res){

 const {name,email,password} = req.body

 try{

        const existingUser = await User.findOne({email: email})
        if(existingUser){
            return res.status(409).json({
                message: 'User already exists'
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const registeredUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        if(!registeredUser){
            return res.status(400).json({
                message: 'User registration failed'
            })
        }
        res.status(201).json({
            message: 'User registered successfully',
            user: registeredUser
        })
    }

catch(err){
    res.status(500).json({
        message: err.message
    })
}
 }

 module.exports = {
    registerUser
 }


