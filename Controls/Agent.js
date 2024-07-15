
import Agent from '../models/Agent.js'
// import { welcome, hello } from '../hash.js';



//Register a Agent 

export const RegisterAgent = async(req,res) =>{


    const newUser = new AgentModel(req.body)

    const existingAgent = await AgentModel.findOne({ email: req.body.email,password })
    if (existingAgent) {
        res.status(409).json("Agent Already Exist")
        return false
    }

    const hello = await newUser.save()


    res.json({
        Agent: hello
    })


}


//Login Agent

export const LoginAgent = async(req,res) =>{

    const { email, password } = req.body;

    if (!(email && password)) {
        res.json("empty data");
        return;  
    }

    try {
        const agent = await AgentModel.findOne({ email: email,password });


        if (agent) {
            const token = jwt.sign(
                { id: agent._id },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            res.json({
                Agent: agent,
                Token: token
            });
        } else {
            res.json("Invalid email or password");
        }

    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }

}

//find the agent


// export const Agent = async(req,res) =>{
//     const getUser = await AgentModel.find()
//     res.json(getUser)
// }


//get a agent by id

export const AgentbyId = async(req,res) =>{
    const id = req.params.id
    const GetUserById = await AgentModel.findById(id)
    res.json(GetUserById)
}

// update the agent

export const UpdateAgent = async(req,res) =>{
    const id = req.params.id
    const updateUser = await AgentModel.findByIdAndUpdate(id, req.body)
    res.json(updateUser)
}

