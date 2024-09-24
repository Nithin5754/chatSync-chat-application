

import jwt from "jsonwebtoken";


export const maxAge = 3 * 24 * 60 * 60 * 1000;

export const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: maxAge,
  });
};