const express = require('express')
const mongoose = require('mongoose')
const PropertyModel = require('./models/PropertyType')
const OderModel = require('./models/Oderprop')
const AgentModel = require('./models/Agent')
const AdminModel = require('./models/Admin')
const cors = require('cors')
const UserModel = require('./models/User')
const dotenv = require('dotenv')
const { encryptpassword, comparepassword } = require('./hashpass/hash')
const nodemailer = require("nodemailer");
const {createServer} = require('http')
import AgentRouter from './routes/Agent'
import AdminRouter from './routes/Admin'
import PropertyRouter from './routes/Property'







const jwt = require("jsonwebtoken")
const MessageModel = require('./models/Message')







const app = express()

const httpServer = createServer(app);

const { Server } = require("socket.io");

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
app.use("/api/property" , PropertyRouter)





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

    let userpassword = await encryptpassword(password)
    newUser.password = userpassword
    const hello = await newUser.save()
    res.json({
        User: hello
    })

})


app.post('/user/login', async (req, res) => {

    const { email, password } = req.body

    const getUser = await UserModel.findOne({ email })
    if (getUser) {
        const validateUserpass = await comparepassword(passward, getUser.password)
        if (validateUserpass) {
            let token = jwt.sign({ id: getUser._id }, process.env.JWT_SECRET, { expiresIn: "2h" })
            res.json({
                User: getUser,
                Token: token
            })
        }



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













mongoose.connect('mongodb://127.0.0.1:27017/RealEstate')



httpServer.listen(3001, () => {
    console.log('The server is running');
})
