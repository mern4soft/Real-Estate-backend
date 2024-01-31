const express = require("express")
import { property,GetAllProperty,GetPropertyById,DeleteProperty,UpdateProperty } from "../Controls/Property"

const router=express.Router()

//add property
router.post('/property' , property)

//get all property
router.get('/' , GetAllProperty)

//get property by id
router.get('/:id', GetPropertyById)

//update property
router.put('/:id',  UpdateProperty)

//delete property
router.delete('/:id', DeleteProperty)



