import User from "../models/UserModal.js";

export const searchUser = async (req, res, next) => {
  const { searchItem } = req.body;

  console.log(req.user, "hey");

  if (searchItem === undefined || searchItem === null) {
    return res.status(400).json({ message: "not found" });
  }

  const sanitizeSearchInp = searchItem.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");

  const regex = new RegExp(sanitizeSearchInp, "i");

  const users = await User.find({
    $and: [
      { _id: { $ne: req.user._id } },
      { $or: [{ firstName: regex }, { lastName: regex }, { username: regex }] },
    ],
  });

  if (users.length >= 1) {
    let usersData = users.map((user) => {
      return {
        id: user._id,
        profileImage: user.profile_image,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        color: user.color,
        profileSetup: user.profileSetup,
        username: user.username,
      };
    });

    return res.status(200).json({ data: usersData });
  }

  return res.status(200).json({ data: "empty users" });
};

export const ChatIdByUserName = async (req, res, next) => {
  const { chatId } = req.body;

  console.log(req.user, "hey");

  if (chatId === undefined || chatId === null) {
    return res.status(400).json({ message: "not found" });
  }

  const sanitizeSearchInp = chatId.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");

  const regex = new RegExp(sanitizeSearchInp, "i");

  const users = await User.findOne({
    $and: [{ _id: { $ne: req.user._id } }, { username: regex }],
  });

  if (users) {
    let usersData = {
      id: users._id,
      profileImage: users.profile_image,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      color: users.color,
      profileSetup: users.profileSetup,
      username: users.username,
    };

    return res.status(200).json({ data: usersData });
  }

  return res.status(200).json({ data: "empty users" });
};
