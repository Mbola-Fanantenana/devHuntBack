const { Router } = require('express')
const { getAllUsers, signup, login} = require('../controllers/Auth')
const router = Router()

router.get('/users', getAllUsers)
router.post('/signup', signup)
router.post('/login', login)

module.exports = router