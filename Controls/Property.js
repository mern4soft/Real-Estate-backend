import PropertyModel from '../models/PropertyType'



// Add property  


export const property = async(req,res)=>{
    console.log(req.body);
    const newProperty = new PropertyModel(req.body)
    const savedProperty = await newProperty.save()
    res.json(savedProperty)

}

// get all property 


export const GetAllProperty = async(req,res) =>{
    const newProperty = await PropertyModel.find()
    res.json(newProperty)
}


//get property by id

export const GetPropertyById = async(req,res) =>{
    const id = req.params.id
    const GetProductById = await PropertyModel.findById(id)
    res.json(GetProductById)
}


//update property 


export const  UpdateProperty = async(req,res)=>{
    const id = req.params.id;
    const updateprop = await PropertyModel.findByIdAndUpdate(id, { $set: { ...req.body } });
    res.json(updateprop)
}


//delete property



export const DeleteProperty = async(req,res) =>{
    const id = req.params.id
    const updateprop = await PropertyModel.findByIdAndDelete(id)
    res.json(updateprop)

}