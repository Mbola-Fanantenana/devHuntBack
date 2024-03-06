const { GoogleGenerativeAI } = require("@google/generative-ai");
const { HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// configuration de Google Generative AI
const configuration = new GoogleGenerativeAI(process.env.API_KEY);

// Paramètres de sécurité pour bloquer le contenu inapproprié
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Chargement du modèle Generative AI
const model = configuration.getGenerativeModel({
  model: "gemini-pro",
  safetySettings,
});

// Historique des réponses générées
const history = [];

// Fonction pour générer une réponse à partir d'un prompt
const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    history.push(text);
    console.log("History: ", history);

    res.send(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  history,
  generateResponse,
};
