const { Router } = require('express')
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, checkPseudoUtilisateur } = require('../controllers/User')
const router = Router()

const upload = require('../mutler');

router.get('/users', getAllUsers)
router.get('/user/:id', getUserById)
router.get('/checkUser/:pseudoUtilisateur', checkPseudoUtilisateur)
router.post('/createUser', upload.single("imgUtilisateur"), createUser)
router.patch('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)


module.exports = router