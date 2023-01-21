const USers = require('../models/userModel')
const forms = require('../models/applicationModel')
const {generateAdminToken} = require('../utils/token')
const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const Application = require('../models/applicationModel')
const Slots = require('../models/slotModel')
require('dotenv').config()

const AdminEmail = process.env.ADMIN_EMAIL
const AdPassword = process.env.ADMIN_PASSWORD
const Admin_id = process.env.TOKEN_ID
const Admin_Secret = process.env.ADMIN_TOKEN

const credential = {
    email : AdminEmail,
    password : AdPassword
}

const Login = async (req,res) => {
    try{
        console.log(req.body)
        let {email , password} = req.body
        if(credential.email != email){ res.json('Email not found')}
        else{
            if(credential.password != password){ res.json('Password is wrong')}
            else{
                let id = Admin_id
                let tokenGenerate = await generateAdminToken(id)
                res.cookie('adminToken' , tokenGenerate)
                .json({
                    id : Admin_id,
                    email : credential.email,
                    token : tokenGenerate
                })
            }
        }
    }catch(err){
        console.log('error in admin login', err)
        res.status(err?.status).json(err.message)
    }
}

const checkAdmin =  (req,res,next) => {
    const token = res.cookie.jwt
    console.log('token variable ' , token);
    if(token){
        jwt.verify(Admin_Secret , async (err , decodedToken) => {
            if(err) {res.json({status : false}); next();}
            else{
                const admin = res.cookie.jwt
                console.log('admin variable' , admin)
                if(admin) res.json({status : true}) 
                else res.json({status : false}); next()
            }
        })
    }
}

const getUSerInfo = async (req,res) => {
    try{
        const userData = await USers.find();
        res.json(userData)
    }catch(err){
        console.log(err)
        res.send(err.status).json(err.message)
    }
}
const block = async (req,res) => {
    try{
        let id = req.params.id
        console.log(id)
        await USers.findByIdAndUpdate({_id:Types.ObjectId(id)} , {isBlocked : true})
        res.json({status : true})
    }catch(err){
        console.log(err)
        res.status(err.status).json(err.message)
    }
}
const unBlock = async (req,res) => {
    try{
        let id  = req.params.id
        console.log(id)
        await USers.findByIdAndUpdate({_id:Types.ObjectId(id)} , {isBlocked : false})
        res.json({status : true})
    }catch(err){
        console.log(err)
        res.status(err.status).json(err.message)
    }
}

const getForm = async (req,res) => {
    try{
        const application = await forms.find()
        // console.log(application)
        res.json(application)
    }catch(err){
        console.log(err.message)
        res.send(err.status).json(err.message)
    }
}

const approve = async (req,res) => {
    try{
        console.log(req.params.id)
        let id = req.params.id
        await forms.findByIdAndUpdate({_id:Types.ObjectId(id)} , {$set:{isApproved: true}})
        // res.json({status : true})
        res.json(true)
    }catch(err){
        console.log(err.message)
        res.send(err.status).json(err.message)
    }
}

const reject = async (req,res) => {
    try{
        console.log(req.params.id)
        let id = req.params.id
        await forms.findByIdAndUpdate({_id:Types.ObjectId(id)} , {$set : {isApproved : false}})
        // res.json({status : true})
        res.json(false)
    }catch(err){
        console.log(err.message)
        res.send(err.status).json(err.message)
    }
}
const getSlot = async (req,res) => {
    try {
        let slot = await Slots.find({})
        res.json(slot)
    } catch (error) {
      console.log(error);  
    }

}

const approvedCompany = async (req,res) =>{
    try {
        let ac = await Application.find({isApproved : true})
        // console.log(ac)
        res.json(ac)
    } catch (error) {
        
    }
}

const bookSlot = async (req,res) => {
    try{
        console.log('hai',req.body);
        const {company_name,choosedSlot:{slotName,position} , userId} = req.body
        console.log(slotName,position);
        if(company_name == null) {

        } else {
            Slots.updateOne({},{$set:{
                [`${slotName}.${position}.company`]:company_name,
                [`${slotName}.${position}.isAlloted`]:true
            }}).then((res) => {
                console.log(res);
            }).catch(err => {console.log(err);})        
        }
    }catch(err){
        console.log(err);
    }
}

module.exports = {Login , getUSerInfo , checkAdmin , block , unBlock , getForm , approve , reject , getSlot ,bookSlot  , approvedCompany} 