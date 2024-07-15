
import AdminModel from '../models/Admin.js'
import Admin from '../models/Admin.js'

// import { welcome, hello } from '../hash.js';




//Register Admin


export const RegisterAdmin = async(req,res) =>{

    const { name, email, password, isAdmin } = req.body

    const existingAdmin = await AdminModel.findOne({ email })

    if (existingAdmin) {
        return res.json("email Already Exist")
    }

    const Admin = await new AdminModel(req.body)

  


    const admin = await Admin.save()
    res.json({
        Admin: admin
    })

}


//Login Admin

export  const LoginAdmin = async(req,res) =>{

     const { email, password } = req.body

     if (!(email && password)) {
        return res.json("Add Data")
     }

    const getAdminEmail = await AdminModel.findOne({ email ,password})

     if (!getAdminEmail) {
        return res.json("Admin Does't exist")
     }

     if (getAdminEmail) {
        
            const token = jwt.sign({ id: getAdminEmail._id }, process.env.JWT_SECRET, { expiresIn: "2h" })

            res.json({
                Admin: getAdminEmail,
                Token: token
            })


    }

}

