declare global {
  var globalThis: any;
}

import prisma from '../../lib/prisma';

import verifyToken from '@/middleware/verifyJWT';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

interface CustomApirequest extends NextApiRequest {
  user: any;
}

const favoriteHandler = async (req: CustomApirequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    verifyToken(req, res, async () => {
      try {
        const { userId } = req.body;
        console.log('req.body', req.body);
        const user = req.user;

        if (user.id !== userId) {
          return res
            .status(401)
            .json({ message: 'Unauthorized', success: false });
        } else {
          res.json({ message: 'Authorized', success: true });
        }
      } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: err.message, success: false });
      }
    });
  }
};

export default favoriteHandler;
