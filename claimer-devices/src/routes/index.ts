import { requireAuth } from '@suffix-ticketing/commonfn';
import express, { Request, Response } from 'express';
import { Devices } from '../models/Devices';

const router = express();

router.get('/api/devices', requireAuth, async (req: Request, res: Response) => {
  const devices = await Devices.find({});
  res.send(devices);
});
export { router as getDevicesRouter };
