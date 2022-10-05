import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import cookieSession from 'cookie-session';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { getUsersRouter } from './routes';
import { deleteUserRouter } from './routes/deleteUser';
import { currentUserRouter } from './routes/currentUser';
import { signoutRouter } from './routes/signout';

const app = express();
app.set('trust-proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUserRouter)
app.use(signoutRouter)
app.use(signinRouter)
app.use(signupRouter);
app.use(getUsersRouter)
app.use(deleteUserRouter)
app.all('*', async () => {
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
