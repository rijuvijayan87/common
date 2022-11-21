import { CustomError } from './custom-error';

export class ResourceNotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not found');
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: 'Resource not found',
      },
    ];
  }
}
