const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    A:{
        type:Array
    },
    B:{
        type:Array
    },
    C:{
        type:Array
    },
    D:{
        type:Array
    },
    E:{
        type:Array
    },
    F:{
        type:Array
    },
    G:{
        type:Array
    },
    H:{
        type:Array
    }
})

module.exports = mongoose.model('slots', slotSchema)

//  let hi =
// {
//   A:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   B:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   C:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   D:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   E:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   F:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   G:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
//   H:[
// {company:'',isAlloted:false},
// {company:'',isAlloted:true},
// {company:'',isAlloted:false},
// {company:'',isAlloted:false}],
// }