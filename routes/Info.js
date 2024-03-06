const { Router } = require('express')
const { getAllInfos, getInfoById, createInfo, updateInfo,deleteInfo } = require('../controllers/Info')
const router = Router()

router.get('/infos', getAllInfos)
router.get('/info/:id', getInfoById)
router.post('/createInfo', createInfo)
router.patch('/updateInfo/:id', updateInfo)
router.delete('/deleteInfo/:id', deleteInfo)


module.exports = router