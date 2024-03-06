const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const generateJwtToken = require("../jwt");

const upload = require('../mutler');

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany({
      orderBy: { idUtilisateur: "asc" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: message.error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await prisma.utilisateur.findUnique({
      where: { idUtilisateur: parseInt(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    console.log("Requête reçue:", req.body);

    const { pseudoUtilisateur, emailUtilisateur, mdpUtilisateur } = req.body;

    console.log("Données extraites:", pseudoUtilisateur, emailUtilisateur, mdpUtilisateur);

    if (!req.file) {
      console.log("Aucune photo sélectionnée.");
      return res.status(400).json({ error: "Veuillez sélectionner une photo" });
    }

    const hachedMdp = await bcrypt.hash(mdpUtilisateur, 10);

    const newUser = await prisma.utilisateur.create({
      data: {
        pseudoUtilisateur,
        emailUtilisateur,
        imgUtilisateur: req.file.path,
        mdpUtilisateur: hachedMdp,
      },
    });

    const token = generateJwtToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error.message);
    res.status(500).json({ msg: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { pseudoUtilisateur, emailUtilisateur, mdpUtilisateur } = req.body;

    const updatedUser = await prisma.utilisateur.update({
      where: { idUtilisateur: parseInt(req.params.id) },
      data: {
        pseudoUtilisateur,
        emailUtilisateur,
        mdpUtilisateur: mdpUtilisateur
          ? await bcrypt.hash(mdpUtilisateur, 10)
          : undefined,
      },
    });

    res.status(200).json(updatedUser);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) { }
};

const deleteUser = async (req, res) => {
  try {
    const user = await prisma.utilisateur.delete({
      where: { idUtilisateur: parseInt(req.params.id) },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const checkPseudoUtilisateur = async (req, res) => {
  try {
    const pseudo = await prisma.utilisateur.findUnique({
      where: { pseudoUtilisateur: req.params.username },
    });

    if (pseudo === null) {
      res.status(404).json({ message: "Utilisateur introuvable" });
      return;
    }

    res.json(pseudo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  checkPseudoUtilisateur,
};
