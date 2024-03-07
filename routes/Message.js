const express = require('express');
const router = express.Router();
const messageController = require('../controllers/Message');

//POST
router.post('/createMessage/:emetteurMessageId/:recepteurMessageId', messageController.createMessage);

//GET
router.get('/getConversationDeuxUser/:recepteurMessageId/:emetteurMessageId', messageController.getConversationDeuxUser);
router.get('/getUnreadMessagesCount/:recepteurMessageId/:emetteurMessageId', messageController.getUnreadMessagesCount);
router.get('/getUnreadMessagesForEmitter/:recepteurMessageId/:emetteurMessageId', messageController.getUnreadMessagesForEmitter);//
router.get('/getConversationByUserId/:emetteurMessageId', messageController.getConversationByUserId);
router.get('/getUnreadMessagesForAllReceivers', messageController.getUnreadMessagesForAllReceivers);

router.get('/getUnreadMessageCountsForUser/:recepteurMessageId', messageController.getUnreadMessageCountsForUser);

router.get('/markMessagesAsRead/:recepteurMessageId/:emetteurMessageId', messageController.markMessagesAsRead);//

module.exports = router;