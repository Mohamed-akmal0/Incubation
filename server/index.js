const express = require('express')
const app = express()
const cookie = require('cookie-parser')
const { json } = require('express')
const cors = require ('cors')
const connectDB = require('./config/db')
const authRoutes = require ('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const adminRoutes = require('./Routes/adminRoute')
port  = 3005

app.listen(port , () => {
    console.log(`port is running at ${port} `)
}) 
//database connection calling 
connectDB()

app.use(cors({
    origin : ['http://localhost:3000'],
    methods : '*',
    credentials : true
}))

app.use(json())
app.use(cookie())
app.use('/api/user' ,userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/admin' , adminRoutes)