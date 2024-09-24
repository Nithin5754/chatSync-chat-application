
import User from "../models/UserModal.js";
import { createToken, maxAge } from "../utils/tokenCreate.js";


export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send("email password required");
    }

    const user = await User.create({
      email,
      password,
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
          profileSetup:user.profileSetup,

        },
      });
  } catch (error) {
    console.log({ error });

    return res.status(500).send("internal server error");
  }
};
