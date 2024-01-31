const bcrypt = require('bcrypt')


let encryptpassword =  async(password) =>{

    return await bcrypt.hash(password, 10)
   
}



let comparepassword = async(hashpassword,password) => {

    return await bcrypt.compare(hashpassword, password)

}


module.exports = {encryptpassword,comparepassword}