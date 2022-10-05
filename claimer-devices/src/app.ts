import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUser, errorHandler, NotFoundError } from '@suffix-ticketing/commonfn';
import { getDevicesRouter } from './routes';
import { createDeviceRouter } from './routes/new';
import { deleteDeviceRouter } from './routes/delete';
import { showDeviceRouter } from './routes/show';
import { deviceUpdateRouter } from './routes/update';

const app = express();
app.set('trust-proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(currentUser)
app.use(createDeviceRouter)
app.use(getDevicesRouter)
app.use(deleteDeviceRouter)
app.use(showDeviceRouter)
app.use(deviceUpdateRouter)
app.all('*', async () => {
  console.log('url not found')
  throw new NotFoundError();
});
app.use(errorHandler);
export { app };
