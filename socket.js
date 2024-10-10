import { Server as SocketServer } from "socket.io";

import Messages from "./models/messageModel.js";

function SocketSetUp(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  console.log(userSocketMap, "my map");
  const disconnectUser = (socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      console.log( "socket io disconnect");
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {

    console.log(message)
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createMessage = await Messages.create(message);

    const messageData = await Messages.findById(createMessage._id)
    .populate("sender", "_id email firstName lastName profile_image color username")
    .populate("recipient", "_id email firstName lastName profile_image color username");

    if (!messageData) {
      return res.status(404).json({ error: "Message not found" });
    }

console.log(messageData,"message data")
    if(recipientSocketId){
      io.to(recipientSocketId).emit("receiveMessage",messageData)
    }

    if(senderSocketId){
      io.to(senderSocketId).emit("receiveMessage",messageData)
    }
  };







  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;



    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log("userConnected" + userId + "with socket id" + socket.id);
      console.log(userSocketMap, "my map");
    } else {
      console.log("User ID not provided during connection");
    }

    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => {
      console.log("user disconnected");
      disconnectUser(socket);
    });
  });
}

export default SocketSetUp;
