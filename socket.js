import { Server as SocketServer } from "socket.io";

function SocketSetUp(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },
  });
  
  const userSocketMap = new Map();

  console.log(userSocketMap,"my map")
  const disconnectUser = (socket) => {
    for (const [userId, {socketId,username}] of userSocketMap.entries()) {
      console.log(username,"socket io disconnect")
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };
  io.on("connection", (socket) => {
    const {userId,username} = socket.handshake.query;

    
    if (userId&&username) {
      userSocketMap.set(userId, {socketId:socket.id,username});
      console.log("userConnected" + userId + "with socket id" + socket.id);
      console.log(userSocketMap,"my map")
    } else {
      console.log("User ID not provided during connection");
    }
    socket.on("disconnect", () => {
      console.log("user disconnected");
      disconnectUser(socket);
    });
  });
 
}


export default SocketSetUp;
