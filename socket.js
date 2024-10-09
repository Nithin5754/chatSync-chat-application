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

  const disconnectUser = (socket) => {
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log("userConnected" + userId + "with socket id" + socket.id);
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
