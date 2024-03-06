const { Router } = require('express')
const { getAllEntraide, getEntraideById, createEntraide, updateEntraide,deleteEntraide } = require('../controllers/Entraide')
const router = Router()

const upload = require('../mutler');

router.get('/entraides', getAllEntraide)
router.get('/entraide/:id', getEntraideById)
router.post('/createEntraide', upload.single("logoEntraide"),  createEntraide)
router.patch('/updateEntraide/:id', upload.single("logoEntraide"), updateEntraide)
router.delete('/deleteEntraide/:id', deleteEntraide)


module.exports = router