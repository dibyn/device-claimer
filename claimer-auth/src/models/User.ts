/*
We work with our MongoDB database using Mongoose in order to have Mongoose communicate
with MongoDB, we have to create a model, and that model represents the collection of records we have
inside of Mongo DB
*/
//doc and ticket address interface is the set of properties required
//to build a record after the record is actually and saved and essentially turned into a document,
//that document might save some additional properties placed on Mongoose automatically

import mongoose from 'mongoose';
import { Password } from '../services/password';
import { PrivilegeTypes } from '../types/privilege-types';

// an interface that describes the properties that were required to create a record
// properties that are required to build a new ticket
//an interface to describe the props that are required to create a new user

// we create two separate interfaces because the properties that are
// required to create an order might be different than properties that
// actually end up on an order

interface UserAttrInterface {
  email: string;
  password: string;
  designation: string;
  privilege: PrivilegeTypes;
}
// an interface that describes the properties that a User Document has
// document or instance of ticket represents one single record
interface UserDoc extends mongoose.Document {
  // properties a User has
  email: string;
  password: string;
  updatedAt: Date;
  designation: string;
  privilege: PrivilegeTypes;
}
// an interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  //model essentially represents the entire collection of data
  // properties tied to the Model
  build(attrs: UserAttrInterface): UserDoc;
}
// schema to tell all the properties User gonna have
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    privilege: {
      type: String,
      required: true,
      enum: Object.values(PrivilegeTypes),
    },
  },
  {
    // returned data to the api
    // toJSON manipulate the JSON representation of this data
    // alters mongo to save _id as id instead
    // also alters mongo to delete ret.password and ret.__v
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);
userSchema.pre('save', async function(done) {
  if(this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})
userSchema.statics.build = (attrs: UserAttrInterface) => new User(attrs);
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User };
