const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const generateJwtToken = require("../jwt");

const upload = require('../mutler');
const { use } = require("../routes/Auth");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: message.error });
  }
};

const signup = async (req, res) => {
  try {
    console.log("Requête reçue:", req.body);
    const {
      nomUtilisateur,
      prenomUtilisateur,
      adresseUtilisateur,
      telUtilisateur,
      niveauUtilisateur,
      matriculeUtilisateur,
      pseudoUtilisateur,
      emailUtilisateur,
      mdpUtilisateur
    } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mdpUtilisateur, saltRounds);

    const user = await prisma.utilisateur.create({
      data: {
        nomUtilisateur: nomUtilisateur,
        prenomUtilisateur: prenomUtilisateur,
        adresseUtilisateur: adresseUtilisateur,
        telUtilisateur: telUtilisateur,
        niveauUtilisateur: niveauUtilisateur,
        matriculeUtilisateur: matriculeUtilisateur,
        pseudoUtilisateur: pseudoUtilisateur,
        emailUtilisateur: emailUtilisateur,
        imgUtilisateur: req.file ? req.file.path : null,
        mdpUtilisateur: hashedPassword
      }
    });

    res.status(201).json(user)
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { pseudoUtilisateur, mdpUtilisateur } = req.body

    if (pseudoUtilisateur == null) {
      throw new error('pseudo undefined')
    }

    const user = await prisma.utilisateur.findUnique({
      where: {
        pseudoUtilisateur
      }
    })

    if (!user || !bcrypt.compareSync(mdpUtilisateur, user.mdpUtilisateur)) {
      return res.status(401).json({ error: "Informations d'identification incorrect" })
    }

    const token = generateJwtToken(user.idUser)

    res.status(200).json({ user: user, token })
  } catch (error) {
    res.status(401).json({ msg: error.message })
  }
}

const faceAuth = async (req, res) => {
  const { pseudoUtilisateur } = req.body

  try {

    if (pseudoUtilisateur == null) {
      throw new error('pseudo undefined')
    }

    const user = await prisma.utilisateur.findFirst({
      where: {
        pseudoUtilisateur: pseudoUtilisateur
      }
    });

    const token = generateJwtToken(user.idUser);
    const userWithToken = {};

    userWithToken["token"] = token;
    userWithToken["user"] = user;
    
    res.status(200).json(userWithToken);

  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  faceAuth
};
