import express, { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { User } from '../models/User';

const router = express();

router.get('/api/users', async (req: Request, res: Response) => {
  if (!req.session?.jwt) throw new NotAuthorizedError()
  const users = await User.find({});
  if (!users.length) throw new BadRequestError('Users not created yet');
  res.status(201).send(users);
});

router.get(
  '/api/users/:id',
  async (req: Request, res: Response) => {
  if (!req.session?.jwt) throw new NotAuthorizedError()
    const users = await User.findById(req.params.id);
    if (!users) throw new BadRequestError('User not found');
    res.status(201).send(users);
  }
);
export { router as getUsersRouter };
