const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')

const user_Schema = new mongoose.Schema({
    username : String,
    email : {
        type : String,
        required : [true , 'Email is required'],
        unique : true
    },
    password : {
        type : String,
        required : [true , 'Password is required'],
    },
    isBlocked:
    {
        type:Boolean
    }
})
user_Schema.pre("save" , async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    next()
})

user_Schema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password , user.password)
        if(auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

module.exports = mongoose.model('Users' , user_Schema)