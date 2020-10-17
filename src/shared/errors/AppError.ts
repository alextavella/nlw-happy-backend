import HttpStatus from 'http-status-codes';

class AppError {
  constructor(
    readonly message: string,
    readonly statusCode = HttpStatus.BAD_REQUEST,
  ) {}
}

export default AppError;
