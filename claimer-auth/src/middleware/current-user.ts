import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { PrivilegeTypes } from '../types/privilege-types';

interface UserPassword {
  id: string;
  email: string;
  privilege: PrivilegeTypes.Admin;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPassword;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) throw new NotAuthorizedError()
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPassword;
    req.currentUser = payload;
    next();
  } catch (error) {
    throw new Error('Something went wrong')
  }
};
