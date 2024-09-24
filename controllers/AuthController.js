
import User from "../models/UserModal.js";
import { createToken, maxAge } from "../utils/tokenCreate.js";
import bcrypt from "bcrypt";

export const signup = async (req,res) => {
  try {
    const  {registerData:{ email, password,firstName,lastName }}= req.body;


    console.log(req.body,"req.body")
    if (!email || !password) {
      return res.status(200).send("email password required");
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName
    });

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });


    return res
      .status(201)
      .json({
        user: {
          id: user._id,
          email: user.email,
          firstName:user.firstName,
          profileSetup:user.profileSetup,

        },
      });
  } catch (error) {
    console.log({ error });

    return res.status(500).send("internal server error");
  }
};


export const login = async (req, res) => {
  console.log("login");
  
  const { loginData:{email, password} } = req.body;

  console.log(req.body,"req.body")

  try {
    const user = await User.findOne({ email });

    console.log(user,"find user")

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
   return res.status(200).json({user: {
    id: user._id,
    email: user.email,
    firstName:user.firstName,
    profileSetup:user.profileSetup,

  },})
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
