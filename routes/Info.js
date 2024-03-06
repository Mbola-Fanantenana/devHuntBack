const { Router } = require('express')
const { getAllInfos, getInfoById, createInfo, updateInfo,deleteInfo } = require('../controllers/Info')
const router = Router()

const upload = require('../mutler');

router.get('/infos', getAllInfos)
router.get('/info/:id', getInfoById)
router.post('/createInfo', upload.single("imgInfo"), createInfo)
router.patch('/updateInfo/:id', upload.single("imgInfo"), updateInfo)
router.delete('/deleteInfo/:id', deleteInfo)


module.exports = router