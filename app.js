const express= require('express')
const mongoose= require ('mongoose')
const cors = require( 'cors' )
const helmet = require( 'helmet' )
const app = express()
app.use(express.json())
/* import User from './UserModel/UserModel' */
const User = require('./UserModel/UserModel')



app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
    res.send("Welcome User")
    
})

//Fetch All Users
app.get('/users',async(req,res)=>{
    try{
        const data = await User.find({})
        res.status(200).json(data)
    }
    catch(error){
        res.status(500).json({message:error.message})

    }
})

//Create a User
app.post('/users',async(req,res)=>{
    try{
        const data = await User.create(req.body)
        res.status(200).json(data)
    }
    catch(error){res.status(500).json({message : error.message})}
    
})

//Find a User
app.get('/users/:id',async(req,res)=>{
    try{
        
        
        const {id} = req.params
        const data = await User.findById(id)
        res.status(200).json(data)
    }
    catch(error){res.status(500).json({message : error.message})}
    
})


//Update User Details
app.put('/users/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const data = await User.findByIdAndUpdate(id, req.body)
        if(!data){
            res.status(404).json({message : error.message})
        }

        const updatedData = User.findById(id)
        res.status(200).json(updatedData)

    }
    catch(error){res.status(500).json({message : error.message})}
    
})

//Delete User Details
app.delete('/users/:id',async(req,res) => {
    try{
        
        const id = req.params.id
        
        const data = await User.findByIdAndDelete(id)
        res.status(200).json({message:"User Deleted Successfully"})
    }
    catch (error){res.status(500).json({message:error.message})}
})

mongoose.connect('mongodb+srv://admin:pass@rahulapi.0engmq7.mongodb.net/Users?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to MongoDB Database")

    app.listen(4000,(req,res)=>{
        console.log("Listening to port 4000")
        
    })
})
.catch((error)=>{
    console.log(error.message)
})


