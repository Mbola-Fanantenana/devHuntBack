const { Router } = require('express')
const { signup, login, faceAuth} = require('../controllers/Auth')
const router = Router()

const upload = require('../mutler');

router.post('/signup', upload.single("imgUtilisateur"), signup)
router.post('/login', login)
router.post('/faceAuth', faceAuth)

module.exports = router
