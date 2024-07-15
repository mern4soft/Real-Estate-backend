import express from 'express';
import mongoose from 'mongoose';
// import PropertyModel from './models/PropertyType.js';
import OderModel from './models/Oderprop.js';
// import AgentModel from './models/Agent.js';
// import AdminModel from './models/Admin.js';
import cors from 'cors';
import UserModel from './models/User.js';
import dotenv from 'dotenv';
// import {hello,welcome} from './hash.js'
import nodemailer from 'nodemailer';
import { createServer } from 'http';
import AgentRouter from './routes/Agent.js';
import AdminRouter from './routes/Admin.js';
// import PropertyRouter from './routes/Property.js';
import jwt from 'jsonwebtoken';
import MessageModel from './models/Message.js';
import { Server } from 'socket.io'
import { log } from 'console';
import bcrypt from 'bcrypt'


const app = express()

const httpServer = createServer(app);


const io = new Server(httpServer,{cors:{
    origin:"*",
    methods: ["GET", "POST"]
}});

io.on("connection", (socket) => {
  // ...
  console.log(socket.id);
  console.log('connections...');
  socket.on("message",(data)=>{
    console.log(data,'data')
    io.emit("sent_message","how are you")
  })
});

app.use(express.json())

app.use(cors());

dotenv.config()


const transporter = nodemailer.createTransport({
    sevice:"gmail",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "process.env.MAIL_USERNAME",
      pass: "process.env.MAIL_PASSWORD"
    },
  });

//middleware

app.get('/send-email', (req, res) => {
    // Define mail options
    const mailOptions = {
        from: process.env.MAIL_USERNAME, // Update with your Gmail address
        to: 'mern4soft@gmail.com', // Update with the recipient's email address
        subject: 'Nodemailer Project',
        text: 'Hi from your nodemailer project',
    };



    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error ' + err);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent successfully');
            res.status(200).send('Email sent successfully');
        }
    });
});

// Agent



app.use("/api/agent", AgentRouter )
app.use("/api/admin" , AdminRouter )
// app.use("/api/property" , PropertyRouter)





app.get('/property/:id', async (req, res) => {
    const id = req.params.id 
    const getPropertyofAgent = await PropertyModel.find({ isAgent: new mongoose.Types.ObjectId(id) })
    res.json(getPropertyofAgent)
})


//Oder


app.post('/oder', async (req, res) => {
    const Buyer = new OderModel(req.body)
    const oder = await Buyer.save()
    res.json(oder)
})

app.get('/oder/:id', async (req, res) => {
    const id = req.params.id
    const response = await OderModel.find({ customerId: id })
    console.log(response);
    const resp = await PropertyModel.find({ propertyId: response.propertyId })
    res.json({
        orders: response,
        property: resp
    })
})







app.post('/user/signup', async (req, res) => {

    const {
        name,
        email,
        age,
        place,
        number,
        password,
        isUser
    } = req.body

    const ExistingUser = await UserModel.findOne({ email })

    if (ExistingUser) {
        return res.json("User Already existed")
    }

    const newUser = new UserModel(req.body)
    const hello = await newUser.save()
    res.json({
        User: hello
    })

})


app.post('/user/login', async (req, res) => {

    const { email, password } = req.body

    const getUser = await UserModel.findOne({ email,password })
    if (getUser) {
            let token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" })
            res.json({
                User: getUser,
                Token: token
            })
        



    }

})



app.post('/messages', async (req, res) => {
    try {
        let message = new MessageModel(req.body);
        let resp = await message.save();
        
        // Emit the message to all connected clients using Socket.IO
        io.emit('newMessage', resp);

        res.json(resp);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while saving the message.' });
    }
});





mongoose.connect('mongodb+srv://bhagyaraj168:kannan2001@cluster0.7nf6oiw.mongodb.net/RealEstate')
.then(()=>console.log("server is running -----------------"))



httpServer.listen(3001, () => {
    console.log('The server is running');
})
