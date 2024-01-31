const express = require('express')


import {RegisterAgent,LoginAgent,Agent,AgentbyId,UpdateAgent} from '../Controls/Agent'



const router=express.Router()


router .post("/register", RegisterAgent)

router .post("/Login",LoginAgent)

router .put('/:id', UpdateAgent)

router .get('/:id', AgentbyId)

router .get ('/', Agent)


export default router;