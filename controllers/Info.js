const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


// Fonction pour formater la date au format DD/MM/YY
function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de zéro
    const year = d.getFullYear().toString().slice(-2); // Récupère les deux derniers chiffres de l'année

    return `${day}/${month}/${year}`;
}

const getAllInfos = async (req, res) => {
    try {
        const infos = await prisma.info.findMany({
            orderBy: { idInfo: "asc" },
        });

        // Formatage des dates au format DD/MM/YY
        const formattedInfo = infos.map(info => {
            return {
                ...info,
                dateInfo: formatDate(info.dateInfo)
            };
        });
        res.status(200).json(formattedInfo);
    } catch (error) {
        res.status(500).json({ msg: message.error });
    }
};

const getInfoById = async (req, res) => {
    try {
        const info = await prisma.info.findUnique({
            where: { idInfo: parseInt(req.params.id) },
        });

        if (info) {
            info.dateInfo = formatDate(info.dateInfo);
            res.status(200).json(info);
        } else {
            return res.status(404).json({ msg: "Information not found" });
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createInfo = async (req, res) => {
    try {

        const { idUtilisateur, contenueInfo, heureInfo } = req.body;

        const imageUrl = req.file ? req.file.filename : null;

        const newInfo = await prisma.info.create({
            data: {
                contenueInfo,
                heureInfo,
                imgInfo: imageUrl,
                idUtilisateur: parseInt(idUtilisateur)
            }
        });

        res.status(200).json({ data: newInfo, msg: "Information créée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la création de l'information:", error.message);
        res.status(500).json({ msg: error.message });
    }
};


const updateInfo = async (req, res) => {
    try {
        const { contenueInfo } = req.body;

        const updateInfo = await prisma.info.update({
            where: { idInfo: parseInt(req.params.id) },
            data: {
                contenueInfo,
                imgInfo: req.file.path
            },
        });

        res.status(200).json(updateInfo);

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const deleteInfo = async (req, res) => {
    try {
        const info = await prisma.info.delete({
            where: { idInfo: parseInt(req.params.id) },
        });

        res.status(200).json({ msg: "Information deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllInfos,
    getInfoById,
    createInfo,
    updateInfo,
    deleteInfo
};