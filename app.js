const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const http = require('http');

const port = process.env.APP_PORT || 3000;

const AuthRoute = require("./routes/Auth");
const Chatbot = require("./routes/Chatbot");
const User = require("./routes/User");
const Info = require("./routes/Info");
const Entraide = require("./routes/Entraide");
const Forum = require("./routes/Forum");
const Comment = require("./routes/Comment");
const Message = require("./routes/Message");

const Server = require('socket.io');


dotenv.config();

const server = http.createServer(app);

// const io = server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST'],
//     },
// });

const io = Server(server)

io.on('connection', (socket) => {
    console.log('Connected');

    socket.on('newMessage', (message) => {
        io.emit('update');
        console.log('update');
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

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
app.use("/api", Forum);
app.use("/api", Comment);
app.use("/api", Message);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
