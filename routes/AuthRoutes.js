import { Router } from "express";
import { findUserInfo, login, logout, signup, userNameExist } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";



const authRoutes=Router()

authRoutes.post('/signup',signup)
authRoutes.post('/login',login)
authRoutes.post('/userInfo',verifyToken,findUserInfo)
authRoutes.get('/logout',verifyToken,logout)

authRoutes.post('/isUserExist',userNameExist)




export default authRoutes