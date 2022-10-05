import { requireAuth, validationRequest } from '@suffix-ticketing/commonfn';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Devices } from '../models/Devices';

const router = express();

router.post(
  '/api/devices',
  requireAuth,
  [body('deviceName').not().isEmpty().withMessage('Device Name is required')],
  validationRequest,
  async (req: Request, res: Response) => {
    const { deviceName, deviceDescription, deviceClaimedDate, userId } = req.body;
    const devices = Devices.build({
      deviceName,
      deviceDescription,
      deviceClaimedDate,
      userId
    });
    await devices.save();
    res.status(201).send('Device created successfully');
  }
);

export {
  router as createDeviceRouter
}
