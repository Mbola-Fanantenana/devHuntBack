const { Router } = require('express')
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/User')
const router = Router()

router.get('/users', getAllUsers)
router.get('/user/:id', getUserById)
router.post('/createUser', createUser)
router.patch('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)


module.exports = router