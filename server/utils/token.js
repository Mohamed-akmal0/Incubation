const jwt = require('jsonwebtoken')
require('dotenv').config()
const AdToken = process.env.ADMIN_TOKEN

module.exports.generateAdminToken  = (id) => {
    try{  
        return new Promise ((resolve,reject) => {
            let AdminToken = jwt.sign({id} , AdToken , {expiresIn : '3d'})
            resolve(AdminToken)
        })
    }catch(err){
        console.log('err in admin generate token' , err)
    }
}