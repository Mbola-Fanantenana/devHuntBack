const { PrismaClient } = require("@prisma/client");
const { log } = require("sharp/lib/libvips");
const prisma = new PrismaClient();


// Fonction pour formater la date au format DD/MM/YY
function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de zéro
    const year = d.getFullYear().toString().slice(-2); // Récupère les deux derniers chiffres de l'année

    return `${day}/${month}/${year}`;
}

const getAllComments = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            orderBy: { idCom: "desc" },
        });

        // Formatage des dates au format DD/MM/YY
        const formattedCom = comments.map(comment => {
            return {
                ...comment,
                dateCom: formatDate(comment.dateCom)
            };
        });
        res.status(200).json(formattedCom);
    } catch (error) {
        res.status(500).json({ msg: message.error });
    }
};

const getComById = async (req, res) => {
    try {
        const com = await prisma.comment.findUnique({
            where: { idCom: parseInt(req.params.id) },
        });

        if (com) {
            com.dateCom = formatDate(com.dateCom);
            res.status(200).json(com);
        } else {
            return res.status(404).json({ msg: "Comment not found" });
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createCom = async (req, res) => {
    try {
        console.log("Requête reçue:", req.body);

        const {idForum,idUtilisateur, contenu, heureCom} = req.body;

        console.log("Données extraites:",idForum,idUtilisateur, contenu, heureCom );

        const newCom = await prisma.comment.create({
            data: {
                idForum: parseInt(idForum),
                idUtilisateur: parseInt(idUtilisateur),
                contenu,
                heureCom,
                imgCom: req.file? req.file.path : null
            }
        });

        res.status(200).json({ data: newCom, msg: "Commentaire crée" });
    } catch (error) {
        console.error("Erreur lors de la création du commentaire:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

const updateCom = async (req, res) => {
    try {
        const { contenu } = req.body;

        const updateCom = await prisma.comment.update({
            where: { idCom: parseInt(req.params.id) },
            data: {
                contenu,
                imgCom: req.file.path
            },
        });

        res.status(200).json(updateCom);
        
    } catch (error) { 
        res.status(500).json({ msg: error.message })
    }
};

const deleteCom = async (req, res) => {
    try {
        await prisma.comment.delete({
            where: { idCom: parseInt(req.params.id) },
        });

        res.status(200).json({ msg: "commentrmation deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllComments,
    getComById,
    createCom,
    updateCom,
    deleteCom
};