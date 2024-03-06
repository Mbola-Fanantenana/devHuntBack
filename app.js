const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.APP_PORT || 3000;

const AuthRoute = require("./routes/Auth");
const Chatbot = require("./routes/Chatbot");
const User = require("./routes/User");
const Info = require("./routes/Info");
const Entraide = require("./routes/Entraide");

dotenv.config();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello world !");
});

app.use("/api", AuthRoute);
app.use("/api", Chatbot);
app.use("/api", User);
app.use("/api", Info);
app.use("/api", Entraide);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
