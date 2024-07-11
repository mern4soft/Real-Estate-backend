import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:String,
    place:String,
    number:Number,
    password:String,
    isUser:{
        type: Boolean
    }
       
   


})

const UserModel = mongoose.model("user",UserSchema)
export default UserModel