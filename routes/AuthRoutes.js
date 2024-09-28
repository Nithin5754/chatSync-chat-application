import { Router } from "express";
import { findUserInfo, login, signup } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";



const authRoutes=Router()

authRoutes.post('/signup',signup)
authRoutes.post('/login',login)
authRoutes.post('/userInfo',verifyToken,findUserInfo)



export default authRoutes