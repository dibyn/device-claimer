import express, { Request, Response } from 'express';

const router = express();

router.get(
  '/api/users/signout',
  (req: Request, res: Response) => {
    req.session = null
    res.send(201).send({});
  }
);
export { router as signoutRouter };
