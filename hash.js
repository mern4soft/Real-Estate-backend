const bcrypt = require('bcrypt');

const welcome = async (password) => {
    return await bcrypt.hash(password, 10);
};

const hello = async (hashpassword, password) => {
    return await bcrypt.compare(password, hashpassword);
};

export default { welcome, hello };
