const mongoose = require('mongoose')

const AgentSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:String,
    number:Number,
    occupation:String,
    isAgent:{
        type: Boolean
    }
       
   


})

const AgentModel = mongoose.model("Agent",AgentSchema)
module.exports = AgentModel