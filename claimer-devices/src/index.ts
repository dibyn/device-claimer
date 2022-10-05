import { DatabaseConnectionError } from "@suffix-ticketing/commonfn";
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if(!process.env.JWT_KEY) throw new Error('JWT_Key must be defined')
  if(!process.env.MONGO_URI) throw new Error('MONGO URI must be defined')
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(process.env.MONGO_URI, 'connected to claimer devices db')
  } catch (error) {
    throw new DatabaseConnectionError()
  }
  app.listen(3012, () => {
    console.log('Listening to claimer devices service, 3012')
  })
}
start()
