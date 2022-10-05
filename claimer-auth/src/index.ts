import mongoose from 'mongoose';
import { app } from './app';
import { DatabaseConnectionError } from './errors/database-connection-error';

const start = async () => {
  if(!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined");
  if(!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");
  try {
    console.log('process.env.MONGO_URI', process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to auth db')
  } catch (error) {
    throw new DatabaseConnectionError();

  }
  app.listen(3012, () => {
    console.log('Listening to claimer auth service: 3012');
  });
};
start();
