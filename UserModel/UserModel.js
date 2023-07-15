const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true  
    },
    phone:{
        type:Number,
        default:""
    }
},
{timestamps:true})

const User = mongoose.model('User',UserSchema)

module.exports = User;