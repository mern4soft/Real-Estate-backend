import express from 'express'


import {RegisterAgent,LoginAgent,AgentbyId,UpdateAgent} from '../Controls/Agent.js'



const router=express.Router()


router .post("/register", RegisterAgent)

router .post("/Login",LoginAgent)

router .put('/:id', UpdateAgent)

router .get('/:id', AgentbyId)

// router .get ('/', Agent)


export default router;