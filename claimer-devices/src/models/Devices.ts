import mongoose, { Mongoose } from 'mongoose';

interface DevicesAttrs {
  userId: string;
  deviceName: string;
  deviceDescription: string;
  deviceClaimedDate: Date;
}
interface DevicesDoc extends mongoose.Document {
  userId: string;
  deviceName: string;
  deviceDescription: string;
  deviceClaimedDate: Date;
}
interface DevicesModel extends mongoose.Model<DevicesDoc> {
  build(attrs: DevicesAttrs): DevicesDoc;
}
const devicesSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
  },
  deviceDescription: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  deviceClaimedDate: {
    type: mongoose.Schema.Types.Date,
  },
}, {
  toJSON: {
    transform(doc, ret, options) {
      ret.deviceId = ret._id;
      delete ret.password;
      delete ret.__v;
      delete ret._id;
    },
  }
});
devicesSchema.statics.build = (attrs: DevicesAttrs) => {
  return new Devices(attrs);
};
const Devices = mongoose.model<DevicesDoc, DevicesModel>(
  'Devices',
  devicesSchema
);
export { Devices };
