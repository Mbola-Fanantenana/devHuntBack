const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const generateJwtToken = require("../jwt");

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: message.error });
  }
};

const signup = async (req, res) => {
  const { pseudoUtilisateur, emailUtilisateur, mdpUtilisateur } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mdpUtilisateur, saltRounds);

    const user = await prisma.utilisateur.create({
        data: {
            pseudoUtilisateur: pseudoUtilisateur,
            emailUtilisateur: emailUtilisateur,
            mdpUtilisateur: hashedPassword
        }
    });

    res.status(201).json(user)
  } catch (error) {
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

module.exports = {
  getAllUsers,
  signup,
  login
};
