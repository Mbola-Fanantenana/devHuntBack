const { Router } = require('express')
const { generateResponse, history } = require('../controllers/Chatbot')
const router = Router()

router.post('/generate', generateResponse)

module.exports = router
