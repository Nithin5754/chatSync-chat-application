import express from "express";
import http from "http";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser
from "cookie-parser";

import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import SocketSetUp from "./socket.js";

dotenv.config()

const app = express();

const server = http.createServer(app);

app.use(cors({
  origin:[process.env.ORIGIN],
  methods:['GET','POST','PUT','PATCH','DELETE'],
  credentials:true
}))


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes)
app.use('/api/contacts',contactRoutes)



mongoose.connect(process.env.DATABASE_URI).then(()=>console.log("DATABASE connected"))

server.listen(4000, () => console.log("server started!"));


SocketSetUp(server)