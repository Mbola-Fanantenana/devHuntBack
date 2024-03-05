const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const generateJwtToken = (idUser) => {
    const token = jwt.sign({idUser}, secretKey, { expiresIn: '48h' })
    return token;
}

module.exports = generateJwtToken