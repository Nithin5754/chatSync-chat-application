import jwt from 'jsonwebtoken'
import User from '../models/UserModal.js';
import verifyToekn from '../utils/verifyToekn.js';


export const verifyToken=async(req,res,next)=>{
     
  const token=req.cookies.jwt;


  if(!token)return res.status(404).send("invalid token please try after login")
    const decoded = verifyToekn(token)

    if(decoded){
      req.user = await User.findById(decoded.userId).select("-password");
    }
    
  next()
  
  
}