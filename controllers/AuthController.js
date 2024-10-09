import User from "../models/UserModal.js";
import { createToken, maxAge } from "../utils/tokenCreate.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const {
      registerData: { email, password, firstName, lastName, username },
    } = req.body;
    if (!email || !password || !username) {
      return res.status(200).send("email password required");
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      username,
    });

    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        profileSetup: user.profileSetup,
        username: user.username,
      },
    });
  } catch (error) {
    console.log({ error });

    return res.status(500).send("internal server error");
  }
};

export const login = async (req, res) => {
  const {
    loginData: { email, password },
  } = req.body;

  try {
    const user = await User.findOne({ email });

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
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        profileSetup: user.profileSetup,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const findUserInfo = async (req, res) => {
  try {
    const { user } = req.body;

    const isUserInfo = await User.findOne({ email: user.email });

    return res.status(200).json({
      user: {
        id: isUserInfo._id,
        email: isUserInfo.email,
        firstName: isUserInfo.firstName,
        profileSetup: isUserInfo.profileSetup,
        username: isUserInfo.username,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const userNameExist = async (req, res) => {
  try {
    const { username } = req.body;

    const isUserInfo = await User.findOne({ username });

    if (isUserInfo) {
    return  res.status(200).json({ message: "already exist" });
    } else {
    return  res.status(200).json({ message: "username available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    const user = req.user;

    console.log(user, "logout");

    res.cookie("jwt", createToken(user.email, user._id), {
      maxAge: 1000,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      message: "successfully log out",
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
