export class BaseError extends Error {
    constructor(
      public readonly message: string,
      public readonly statusCode = 400,
      public readonly details?: unknown
    ) {
      super(message);
      this.name = this.constructor.name;
      Error.captureStackTrace?.(this, this.constructor);
    }
  }
  