import { NextFunction, Request, Response } from 'express';
import { DeviceNotFoundError } from '../errors/device-not-found-error';
import { Devices } from '../models/Devices';

export const validateDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const device = await Devices.findById(id)
  console.log({device})
  if(!device) throw new DeviceNotFoundError()
  next()
};
