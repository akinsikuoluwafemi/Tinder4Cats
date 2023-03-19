import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../../lib/prisma';

const loginHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET as string,
      );
      // const favorites = await prisma.favorite.findMany();
      // console.log(favorites);
      res.status(200).json({
        id: user.id,
        token,
        message: 'Login successful',
        success: true,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message, success: false });
    }
  }
};

export default loginHandler;
