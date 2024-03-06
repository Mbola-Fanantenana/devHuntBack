const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const upload = require('../mutler');

const getAllEntraide = async (req, res) => {
    try {
        const entraides = await prisma.entraide.findMany({
            orderBy: { idEntraide: "asc" },
        });
        res.status(200).json(entraides);
    } catch (error) {
        res.status(500).json({ msg: message.error });
    }
};

const getEntraideById = async (req, res) => {
    try {
        const entraide = await prisma.entraide.findUnique({
            where: { idEntraide: parseInt(req.params.id) },
        });

        if (!entraide) {
            return res.status(404).json({ msg: "Entraide not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createEntraide = async (req, res) => {
    try {
        console.log("Requête reçue:", req.body);

        const {  nomEntraide, chefEntraide, detailEntraide, lienEntraide} = req.body;

        console.log("Données extraites:",nomEntraide, chefEntraide, detailEntraide, lienEntraide);

        if (!req.file) {
            console.log("Aucun logo sélectionné.");
            return res.status(400).json({ error: "Veuillez sélectionner un logo" });
        }

        const existingEntraide = await prisma.entraide.findFirst({
            where: {
                nomEntraide: nomEntraide,
            }
        })

        if (existingEntraide) {
            return res.status(400).json({ status: 400, message: "Ce club d'entraide existe déjà." });
        }

        const newEntraide = await prisma.entraide.create({
            data: {
                nomEntraide,
                chefEntraide,
                logoEntraide: req.file.path,
                detailEntraide,
                lienEntraide
            },
        });

        res.status(201).json({ user: newEntraide });
    } catch (error) {
        console.error("Erreur lors de la création du groupe d'entraide:", error.message);
        res.status(500).json({ msg: error.message });
    }
};

const updateEntraide = async (req, res) => {
    try {
        const { chefEntraide, detailEntraide, lienEntraide } = req.body;

        const updatedEntraide = await prisma.entraide.update({
            where: { idEntraide: parseInt(req.params.id) },
            data: {
                chefEntraide,
                logoEntraide: req.file.path,
                detailEntraide,
                lienEntraide
            },
        });

        res.status(200).json(updatedEntraide);
        if (!updateEntraide) {
            return res.status(404).json({ msg: "Entraide not found" });
        }

        res.status(200).json(updateEntraide);
    } catch (error) { 
        res.status(500).json({ msg: error.message })
    }
};

const deleteEntraide = async (req, res) => {
    try {
        const entraide = await prisma.entraide.delete({
            where: { idEntraide: parseInt(req.params.id) },
        });

        if (!entraide) {
            return res.status(404).json({ msg: "Entraide not found" });
        }

        res.status(200).json({ msg: "Entraide deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getAllEntraide,
    getEntraideById,
    createEntraide,
    updateEntraide,
    deleteEntraide
};