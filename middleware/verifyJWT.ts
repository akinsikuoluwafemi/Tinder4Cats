import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface CustomApirequest extends NextApiRequest {
  user: any;
}

const verifyToken = (
  req: CustomApirequest,
  res: NextApiResponse,
  next: () => Promise<void>,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden', success: false });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
