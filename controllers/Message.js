const messageModel = require('../models/Message');

createMessage = async (req, res) => {
    try {
        const data  = req.body;
        const { emetteurMessageId, recepteurMessageId } = req.params

        const message = await messageModel.createMessage( data, emetteurMessageId, recepteurMessageId);
        res.status(200).json(message)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

getConversationDeuxUser = async (req, res) => {
    try {
        const { recepteurMessageId,emetteurMessageId } = req.params;
        const conversations = await messageModel.getConversationDeuxUser(recepteurMessageId,emetteurMessageId);
        res.status(200).json(conversations)

    } catch (e) {
        res.status(500).json({error : e.message})
    }
}

getConversationByUserId = async (req, res)  => {
    try {
        const { emetteurMessageId } = req.params
        const conversations = await messageModel.getConversationByUserId(emetteurMessageId);
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}
getUnreadMessagesCount = async (req, res) => {
    try {
        const { recepteurMessageId ,emetteurMessageId } = req.params;
        console.log(req.params)
        const conversations = await messageModel.getUnreadMessagesCount(recepteurMessageId,emetteurMessageId);
        res.status(200).json(conversations)

    } catch (e) {
        res.status(500).json({error : e.message})
    }
}
getUnreadMessagesForAllReceivers=async (req, res) => {
    try {
        const result = await messageModel.getUnreadMessagesForAllReceivers();
        res.json(result);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages non lus pour chaque destinataire :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};
const getUnreadMessagesForEmitter = async (req, res) => {
    const { emetteurMessageId, recepteurMessageId } = req.params;

    try {
        const unreadMessages = await messageModel.getUnreadMessagesFromEmitter(emetteurMessageId, recepteurMessageId);

        res.json(unreadMessages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUnreadMessageCountsForUser = async (req, res)  => {
    try {
        const { recepteurMessageId } = req.params
        const conversations = await messageModel.getUnreadMessageCountsForUser(recepteurMessageId);
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

markMessagesAsRead = async (req, res) => {
    try {
        const { recepteurMessageId,emetteurMessageId } = req.params;
        const conversations = await messageModel.markMessagesAsRead(recepteurMessageId,emetteurMessageId);
        res.status(200).json(conversations)

    } catch (e) {
        res.status(500).json({error : e.message})
    }
}

module.exports = {
    createMessage,
    getConversationDeuxUser,
    getConversationByUserId,
    getUnreadMessagesCount,
    getUnreadMessagesForAllReceivers,
    getUnreadMessagesForEmitter,
    getUnreadMessageCountsForUser,
    markMessagesAsRead
};
