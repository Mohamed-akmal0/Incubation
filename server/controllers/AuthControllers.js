const userModel = require ('../models/userModel')
const jwt = require('jsonwebtoken')
const maxAge = 3*24*60*60

const createToken = (id) => {
    return jwt.sign({id} , "incubation" , {
        expiresIn : maxAge
    } ) // This sign function will assign new token 
}
//error handling
const handleErrors = (err) => {
    let errors = {email: "" , password : "" , username : ""}

    //login error handling
    if(err.message === 'incorrect email') errors.email = 'Please check you email' 
    if(err.message === 'incorrect password') errors.password = 'please check your password' 
    if(err.message === '')

    //signUp error handling
    if(err.code === 11000){
        errors.email = 'Email is already registered'
        return errors
    }
    
    if(err.message.includes('Users validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message 
        })
    }
    return errors
}

module.exports.signup = async (req,res) => {
    try{
        console.log('inside signup function')
        const {email , password , username} = req.body
        console.log('from signup' , email , password , username)
        const user = await userModel.create({ email , password , username })
        console.log('after creating ' , user)
        const token = createToken(user._id)

        res.cookie("jwt" , token , {
            withCredentials  : true , 
            httpOnly : false,
            maxAge : maxAge * 1000 
        })
        res.status(201).json({user : user._id , created:true})
    }catch(err){
        console.log(err , 'error in signUp route')
        const errors = handleErrors(err);
        res.json({errors , created : false})
    }
}
module.exports.login = async (req,res) => {
    try{
        const {email , password } = req.body
        const user = await userModel.login( email , password )
        const token = createToken(user._id)

        res.cookie("jwt" , token , {
            withCredentials  : true , 
            httpOnly : false,
            maxAge : maxAge * 1000 
        })
        res.status(200).json({user : user._id , created:true})
    }catch(err){
        console.log(err , 'error in signUp route')
        const errors = handleErrors(err);
        res.json({errors , created : false})
    }
}