const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fonction pour formater la date au format DD/MM/YY
function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de zéro
    const year = d.getFullYear().toString().slice(-2); // Récupère les deux derniers chiffres de l'année

    return `${day}/${month}/${year}`;
}

const getAllForum = async (req, res) => {
    try {
        const forums = await prisma.forum.findMany({
            orderBy: { idForum: "desc" },
        });

        // Formatage des dates au format DD/MM/YY
        const formattedForum = forums.map(forum => {
            return {
                ...forum,
                dateForum: formatDate(forum.dateForum)
            };
        });
        res.status(200).json(formattedForum);
    } catch (error) {
        res.status(500).json({ msg: message.error });
    }
};

const getForumById = async (req, res) => {
    try {
        const forum = await prisma.forum.findUnique({
            where: { idForum: parseInt(req.params.id) },
            include : {utilisateur : true}
        });

        if (forum) {
            forum.dateForum = formatDate(forum.dateForum);
            res.status(200).json(forum);
        } else {
            return res.status(404).json({ msg: "Forum not found" });
        }


    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createForum = async (req, res) => {
    try {
        console.log("Requête reçue:", req.body);

        const { contenuForum, heureForum, idUtilisateur, titre } = req.body;

        console.log("Données extraites:", contenuForum, heureForum, idUtilisateur, titre);

        const imageUrl = req.file ? req.file.filename : null

        const newForum = await prisma.forum.create({
            data: {
                contenuForum,
                heureForum,
                imgForum: imageUrl,
                idUtilisateur: parseInt(idUtilisateur),
                titre
            }
        });

        res.status(200).json({ data: newForum, msg: "Forum créé" });
    } catch (error) {
        console.error("Erreur lors de la création du forum:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

const updateForum = async (req, res) => {
    try {
        const { contenuForum, titre } = req.body;

        const updateForum = await prisma.forum.update({
            where: { idForum: parseInt(req.params.id) },
            data: {
                contenuForum,
                titre,
                imgForum: req.file.path
            },
        });

        res.status(200).json(updateForum);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const deleteForum = async (req, res) => {
    try {
        const forum = await prisma.forum.delete({
            where: { idForum: parseInt(req.params.id) },
        });

        res.status(200).json({ msg: "Forum deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const forumId = parseInt(req.params.forumId);

        // Récupérer tous les commentaires associés à un forum spécifique avec Prisma
        const forumWithComments = await prisma.forum.findUnique({
            where: {
                idForum: forumId,
            },
            include: {
                comment: {
                    select: {
                        idCom: true,
                        contenu: true,
                        dateCom: true,
                        heureCom: true,
                        imgCom: true,
                        utilisateur: {
                            select: {
                                idUtilisateur: true,
                                nomUtilisateur: true,
                            },
                        },
                    },
                },
            },
        });

        if (forumWithComments) {
            // Compter le nombre de commentaires associés au forum
            const commentCount = forumWithComments.comment.length;
            res.status(200).json({ comments: forumWithComments.comment, commentCount });
        } else {
            res.status(404).json({ message: 'Forum non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires du forum :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des commentaires du forum' });
    }
};





module.exports = {
    getAllForum,
    getForumById,
    createForum,
    updateForum,
    deleteForum,
    getAllComments
};