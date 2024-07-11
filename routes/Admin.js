import express from 'express'
import { RegisterAdmin , LoginAdmin } from '../Controls/Admin.js'


const router = express.Router()


router .post("/register", RegisterAdmin)

router .post("/Login",LoginAdmin)


export default router;