import { CustomError } from '@suffix-ticketing/commonfn';

export class DeviceNotFoundError extends CustomError {
  statusCode: number = 404;
  constructor() {
    super('Device not found!');
    Object.setPrototypeOf(this, DeviceNotFoundError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'Device not found!',
      },
    ];
  }
}
