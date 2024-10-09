import { disconnect } from "mongoose";
import { Server as SocketServer } from "socket.io";





 function SocketSetUp(server) {


    const io = new SocketServer(server,{
      cors:{
        origin:[process.env.ORIGIN],
        methods:['GET','POST','PUT','PATCH','DELETE'],
        credentials:true
      }
    });



    const userSocketMap=new Map()

    io.on('connection',(socket)=>{
       const userId=socket.handshake.query.userId; 

       if(userId){
        userSocketMap.set(userId,socket.id)
        console.log("userConnected"+userId+"with socket id"+socket.id);
        
       }else{
        console.log("User ID not provided during connection");
        
       }

       socket.on("disconnect",()=>disconnect)
       
    })
    
  }


  export default SocketSetUp