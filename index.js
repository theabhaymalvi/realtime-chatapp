const express = require("express")
const mongoDbConnection = require("./db-connection")
const cors=require("cors");
const userRoutes = require("./routes/users")
const chatRoutes = require("./routes/chats")
const messageRoutes = require("./routes/messages")

const app = express()
mongoDbConnection();

app.use(express.json());
app.use(cors());
// setting routes for different views
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);
app.use("/api/message/", messageRoutes);

const PORT = 5000;
const server = app.listen(PORT, ()=> {
    console.log(`Server is listening on PORT ${PORT}`)
})

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
  
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      var chat = newMessageRecieved.chat;
      if (!chat.users) return console.log("chat.users not defined");
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved",newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
  


