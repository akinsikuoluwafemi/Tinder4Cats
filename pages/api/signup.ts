import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

declare global {
  var globalThis: any;
}

import prisma from '../../lib/prisma';
const signupHandler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method === 'POST') {
    try {
      const { email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
        },
      });

      res
        .status(201)
        .json({ message: 'User created successfully', success: true });
    } catch (e) {
      res.status(409).json({ message: 'User already exists', success: false });
    }
  }
};

export default signupHandler;
