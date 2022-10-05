import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validationRequest } from '../middleware/validation-request';
import { User } from '../models/User';
const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 chars'),
  ],
  validationRequest,
  async (req: Request, res: Response) => {
    const { email, password, designation, privilege } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new BadRequestError('Email already exists');
    const user = User.build({
      email,
      password,
      designation,
      privilege,
    });
    await user.save();
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     privilege: user.privilege,
    //   },
    //   process.env.JWT_KEY!
    // );
    // req.session = { jwt: userJwt };
    res.status(201).send(user);
  }
);
export { router as signupRouter };
