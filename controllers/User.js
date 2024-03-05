const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const generateJwtToken = require("../jwt");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany({
        orderBy: { idUtilisateur: 'asc' }
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
    const { pseudoUtilisateur, emailUtilisateur, mdpUtilisateur } = req.body;
    const hachedMdp = await bcrypt.hash(mdpUtilisateur, 10);

    const newUser = await prisma.utilisateur.create({
      data: {
        pseudoUtilisateur,
        emailUtilisateur,
        mdpUtilisateur: hachedMdp,
      },
    });

    const token = generateJwtToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
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

    res.status(200).json(updatedUser)
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {}
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
