const { Router } = require('express')
const { getAllForum, getForumById, createForum, updateForum,deleteForum, getAllComments } = require('../controllers/Forum')
const router = Router()

const upload = require('../mutler');

router.get('/forums', getAllForum)
router.get('/forum/:id', getForumById)
router.post('/createForum', upload.single("imgForum"), createForum)
router.patch('/updateForum/:id', upload.single("imgForum"), updateForum)
router.delete('/deleteForum/:id', deleteForum)
router.get('/forum/comments/:forumId', getAllComments)


module.exports = router