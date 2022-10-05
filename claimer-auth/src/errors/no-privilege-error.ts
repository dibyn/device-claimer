import { CustomError } from './custom-error';

export class NoPrivilegeError extends CustomError {
  statusCode: number = 403;
  constructor(public asdf: string) {
    super(asdf);
    Object.setPrototypeOf(this, NoPrivilegeError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.asdf,
      },
    ];
  }
}
