``;
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validationRequest } from '../middleware/validation-request';
import { User } from '../models/User';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError('Invalid credentials');
    const passwordsMatch = await Password.compare( existingUser.password, password );
    if (!passwordsMatch) throw new BadRequestError('Invalid credentials');
    console.log(existingUser, 'existingUser')
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        privilege: existingUser.privilege
      },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };
    res.status(200).send('You are signin successfully!');
  }
);
export { router as signinRouter };
