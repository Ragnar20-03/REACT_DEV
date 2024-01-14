const bcrypt = require('bcrypt')

async function hashPassword (password )
{
    const saltRounds = 10 ; 
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPass = await bcrypt.hash(password , salt)
    return hashedPass
}


module.exports = hashPassword 