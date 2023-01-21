const mongoose = require('mongoose')
const Application = require('../models/applicationModel')
module.exports = {
    insertApp :  (data) => {
        try{
            return new Promise ( async (resolve,reject) => {
                let app = await Application(data).save()
                resolve(app)
            })
        }catch(err){
            console.log(err.message)
        }
    }
}