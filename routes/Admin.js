const express =  require('express')
import { RegisterAdmin , LoginAdmin } from '../Controls/Admin'


const router = express.Router()


router .post("/register", RegisterAdmin)

router .post("/Login",LoginAdmin)


export default router;