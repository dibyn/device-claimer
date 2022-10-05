import { requireAuth } from '@suffix-ticketing/commonfn';
import express, { Request, Response } from 'express';
import { validateDevice } from '../middlewares/validateDevice';
import { Devices } from '../models/Devices';

const router = express();

router.delete(
  '/api/devices/:id',
  requireAuth,
  validateDevice,
  async function (req: Request, res: Response) {
    const { id } = req.params;
    await Devices.findOneAndDelete({ id });
    res.send(`Delete record with id ${id}`);
  }
);

export {
  router as deleteDeviceRouter
}
