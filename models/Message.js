const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({


    name:String,
    message:String,
    isAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    isAgent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Agent'

    },
    isUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }


   
    
}) 



const MessageModel = mongoose.model("message",MessageSchema)
module.exports = MessageModel