import jwt from 'jsonwebtoken'


const verifyToekn = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
}
export default verifyToekn