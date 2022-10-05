import { Request, Response, NextFunction } from 'express';
import { NoPrivilegeError } from '../errors/no-privilege-error';
import { User } from '../models/User';
import { PrivilegeTypes } from '../types/privilege-types';

export const adminPrivilege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const currentUser = await User.findById(id);
  if(!currentUser) throw new NoPrivilegeError('User not found')
  if (currentUser?.privilege !== PrivilegeTypes['Admin'])
    throw new NoPrivilegeError('Only admin can perform this action');
  if (currentUser?.id === id)
    throw new NoPrivilegeError('Current user cannot be deleted');
  next();
};
