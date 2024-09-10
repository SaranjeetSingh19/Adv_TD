import jwt from 'jsonwebtoken';

const JWT_SECRET = "fkljdiogsfdasasodjl";

const signToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export default signToken;