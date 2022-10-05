import express, { Request, Response } from 'express';
import { currentUser } from '../middleware/current-user';

const router = express();

router.get(
  '/api/users/currentuser',
  currentUser,
  (req: Request, res: Response) => {
    res.send({
      currentUser: req.currentUser || null,
    });
  }
);
export { router as currentUserRouter };
