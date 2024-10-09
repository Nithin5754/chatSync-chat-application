import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { ChatIdByUserName, searchUser } from "../controllers/contactController.js";



const contactRoutes=Router()

contactRoutes.post('/searchUser',verifyToken,searchUser)

contactRoutes.post('/chatIdByUsername',verifyToken,ChatIdByUserName)

export default contactRoutes