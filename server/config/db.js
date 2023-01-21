const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const connect = await mongoose.connect("mongodb://0.0.0.0:27017/incubation",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('database connected successfully')
    }
    catch(err){
        console.log(err)
        console.log('error at connecting database')
        // process.exit(1)
    }
}

module.exports = connectDB
