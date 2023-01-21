
const { Types } = require('mongoose')
const userFN = require('../service/userDB')
const Application = require('../models/applicationModel')
module.exports.application = (req,res) => {
    try{
        const data = req.body
        userFN.insertApp(data).then((response) => {
        console.log(response)
        res.json({id : response.userId , status : true})
    })
    }catch(error){
        res.send(error.status).json(error.message)
    }
}

module.exports.getStatus = async (req,res) => {
    try{
        let id = req.params.id
        console.log(id);
        let status = await Application.find({userId:Types.ObjectId(id)})
        console.log(status)
        res.json(status)
    }catch(err){
    console.log(err)
    }
}