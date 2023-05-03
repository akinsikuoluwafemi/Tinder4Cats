declare global {
  var globalThis: any;
}

import verifyToken from '@/middleware/verifyJWT';
import { NextApiRequest, NextApiResponse } from 'next';

interface CustomApirequest extends NextApiRequest {
  user: any;
}

const favoriteHandler = async (req: CustomApirequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    verifyToken(req, res, async () => {
      try {
        const { userId } = req.body;
        const user = req.user;

        if (user.id !== userId) {
          return res
            .status(401)
            .json({ message: 'Unauthorized', success: false });
        } else {
          // pass the image_id from the body req.body.image_id to create favorite in prisma
          // await prisma.favorite.create({
          //   data: {
          //     user: {
          //       connect: {
          //         id: userId,
          //       },
          //     },
          //     image_id: '',
          //     userId,
          //   },
          // });
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
