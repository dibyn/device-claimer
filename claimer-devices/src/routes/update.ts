import {
  NotAuthorizedError,
  requireAuth,
} from '@suffix-ticketing/commonfn';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { DeviceNotFoundError } from '../errors/device-not-found-error';
import { Devices } from '../models/Devices';

const router = express.Router();

router.put(
  '/api/devices/:id',
  requireAuth,
  // validateDevice,
  [body('deviceName').not().isEmpty().withMessage('Device name is required')],
  async (req: Request, res: Response) => {
    const device = await Devices.findById(req.params.id);
    if(!device) throw new DeviceNotFoundError()
    if (device.userId !== req.currentUser!.id) throw new NotAuthorizedError();
    device.set({
      deviceName: req.body.deviceName,
      deviceDescription: req.body.deviceDescription,
      deviceClaimedDate: req.body.deviceClaimedDate,
    });
    device.save();
    res.send(device);
  }
);
export {
  router as deviceUpdateRouter
}
