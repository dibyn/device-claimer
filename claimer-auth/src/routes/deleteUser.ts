import express, { Request, Response } from 'express';
import { adminPrivilege } from '../middleware/admin-privilege';
import { User } from '../models/User';

const router = express();
router.delete(
  '/api/users/:id',
  adminPrivilege,
  async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.send(`Delete record with id ${id}`);
  }
);
router.delete(
  '/api/users',
  adminPrivilege,
  async (req: Request, res: Response) => {
    await User.deleteMany({});
    res.send('Delete records of all users');
  }
);
export { router as deleteUserRouter };
