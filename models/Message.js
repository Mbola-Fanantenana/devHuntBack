const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const io = require("socket.io-client");
const socketUrl = process.env.SOCKET_URL;

const socket = io(socketUrl);

const createMessage = async (data, emetteurMessageId, recepteurMessageId) => {
    try {
        const newMessage =  await prisma.message.create({
            data: {
                contenuMessage: data.contenuMessage,
                emetteurMessageId: parseInt(emetteurMessageId),
                recepteurMessageId: parseInt(recepteurMessageId),
                heureMessage: data.heureMessage
            }
        })

        socket.emit('newMessage', newMessage)

        return newMessage;

    } catch (error) {
        throw error
    }
}

//Function for getting the chat between two users
const getConversationDeuxUser =  async (recepteurMessageId,emetteurMessageId)  => {
    try {
        return await prisma.message.findMany({
            where: {
                OR: [
                    {
                        emetteurMessageId: parseInt(emetteurMessageId),
                        recepteurMessageId: parseInt(recepteurMessageId)
                    },
                    {
                        emetteurMessageId: parseInt(recepteurMessageId),
                        recepteurMessageId: parseInt(emetteurMessageId)
                    }
                ]
            },
            orderBy : {
                idMessage : "asc"
            }
        })

    } catch (e) {
        throw e
    }
}


const getConversationByUserId = async (emetteurMessageId) => {
    try {
        const conversations = await prisma.message.findMany({
            where: {
                emetteurMessageId: parseInt(emetteurMessageId),
            },
            orderBy: {
                dateEnvoi: 'desc',
            },
        });

        const conversationsByDestinataire = conversations.reduce((acc, curr) => {
            if (!acc[curr.recepteurMessageId]) {
                acc[curr.recepteurMessageId] = [];
            }
            acc[curr.recepteurMessageId].push(curr);
            return acc;
        }, {});

        return conversationsByDestinataire;
    } catch (e) {
        throw e;
    }
};


//modifie notif_vu en True
const markMessagesAsRead = async (recepteurMessageId, emetteurMessageId) => {

    try {
        await prisma.message.updateMany({
            where: {
                recepteurMessageId: parseInt(recepteurMessageId),
                emetteurMessageId: parseInt(emetteurMessageId),
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });


    } catch (error) {
        console.error('Erreur lors de la mise à jour des messages lus :', error);
    }
};


const getUnreadMessageCountsForUser = async (userId) => {
    try {
        // Récupérer tous les utilisateurs
        const allUsers = await prisma.utilisateur.findMany();

        // Récupérer le compte de messages non lus pour chaque utilisateur
        const unreadMessageCounts = await Promise.all(
            allUsers.map(async (user) => {
                const count = await prisma.message.count({
                    where: {
                        emetteurMessageId: user.idUtilisateur,
                        recepteurMessageId: parseInt(userId),
                        isRead: false,
                    },
                });

                return {
                    senderId: user.idUtilisateur,
                    unreadCount: count,
                };
            })
        );
        socket.emit('newMessage', unreadMessageCounts)
        return unreadMessageCounts;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createMessage,
    getConversationDeuxUser,
    getConversationByUserId,
    // getUnreadMessagesCount,
    markMessagesAsRead,
    //getUnreadMessagesForAllReceivers,
    //getUnreadMessagesFromEmitter,
    getUnreadMessageCountsForUser
};