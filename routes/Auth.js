const { Router } = require('express')
const { signup, login} = require('../controllers/Auth')
const router = Router()

const upload = require('../mutler');

router.post('/signup', upload.single("imgUtilisateur"), signup)
router.post('/login', login)

module.exports = router