import { HttpStatus } from '@nestjs/common';

export class ServiceError extends Error {
  readonly statusCode: number;
  readonly message: string;
  readonly error: Error;
  constructor(statusCode: number, message: string, error: Error) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.name = 'Service Error';
    this.error = error;
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string, error: Error) {
    super(HttpStatus.NOT_FOUND, message, error);
  }
}

export class BadRequestError extends ServiceError {
  constructor(message: string, error: Error) {
    super(HttpStatus.BAD_REQUEST, message, error);
  }
}

export class ConfilctError extends ServiceError {
  constructor(message: string, error: Error) {
    super(HttpStatus.CONFLICT, message, error);
  }
}

export class InternalServerError extends ServiceError {
  constructor(error: Error) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
  }
}
