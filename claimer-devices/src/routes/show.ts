import express, { Request, Response } from 'express';
import { requireAuth } from '@suffix-ticketing/commonfn';
import { validateDevice } from '../middlewares/validateDevice';
import { Devices } from '../models/Devices';

const router = express.Router();

router.get(
  '/api/devices/:deviceId',
  requireAuth,
  validateDevice,
  async (req: Request, res: Response) => {
    const device = await Devices.findById(req.params.deviceId);
    res.send(device);
  }
);
router.get(
  '/api/devices/user/:userId',
   requireAuth,
  async (req: Request, res: Response) => {
    const devices = await Devices.find({
      userId: req.params.userId,
    });
    res.send(devices);
  }
);
export { router as showDeviceRouter };
