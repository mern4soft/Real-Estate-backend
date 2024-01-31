const mongoose = require('mongoose')

const OderSchema = new mongoose.Schema({

    "customerId":{
       type: mongoose.Schema.Types.ObjectId, 
    },
    "propertyId":{
        type:mongoose.Schema.Types.ObjectId, 
    } 

})

const OderModel = mongoose.model("oders",OderSchema)
module.exports = OderModel