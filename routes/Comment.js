const { Router } = require('express')
const { getAllComments, getComById, createCom, updateCom,deleteCom } = require('../controllers/Comment')
const router = Router()

const upload = require('../mutler');

router.get('/comments', getAllComments)
router.get('/comment/:id', getComById)
router.post('/createCom', upload.single("imgCom"), createCom)
router.patch('/updateCom/:id', upload.single("imgCom"), updateCom)
router.delete('/deleteCom/:id', deleteCom)


module.exports = router