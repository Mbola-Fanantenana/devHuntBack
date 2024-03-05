const { Router } = require('express')
const { generateResponse, history } = require('../controllers/Chatbot')
const router = Router()

router.post('/generate', generateResponse)
router.get('/history', (req, res) => {
    res.json({ history })
})

module.exports = router
