const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    console.log("Nom du fichier original:", file.originalname);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log("Type du fichier:", file.mimetype);
    // Ajoutez ici la logique pour le filtre des types de fichiers si nécessaire
    cb(null, true);
  },
});

module.exports = upload;