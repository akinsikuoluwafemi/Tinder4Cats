// declare global {
//   var globalThis: any;
// }

// import prisma from '../../lib/prisma';

// import verifyToken from '@/middleware/verifyJWT';
// import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// interface CustomApirequest extends NextApiRequest {
//   user: any;
// }

// const favoriteHandler = async (req: CustomApirequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     verifyToken(req, res, async () => {
//       try {
//         const { userId, image_id, sub_id } = req.body;
//         console.log(req.body);
//         const user = req.user;

//         if (user.id !== userId) {
//           return res
//             .status(401)
//             .json({ message: 'Unauthorized', success: false });
//         } else {
//           // like here
//           const apikey = req.headers['x-api-key'];
//           console.log(apikey);

//           const { data } = await axios.post(
//             'https://api.thecatapi.com/v1/favourites',
//             {
//               image_id,
//               sub_id,
//             },
//             {
//               headers: {
//                 'x-api-key': apikey,
//               },
//             },
//           );

//           res.json({ data, message: 'Authorized', success: true });
//         }
//       } catch (err: any) {
//         console.log(err);
//         res.status(500).json({ message: err.message, success: false });
//       }
//     });
//   }
// };

// export default favoriteHandler;

declare global {
  var globalThis: any;
}

import prisma from '../../lib/prisma';

import verifyToken from '@/middleware/verifyJWT';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

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
          // removed like from here
          console.log('good');
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
