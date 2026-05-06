import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * the catch decorator on top binds the required metadata to the exception filter
 * this catch decorator can take a single parameter or a coma separated list
 */
@Catch(HttpException)
export class HttpExceptionFilter<
  T extends HttpException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    console.log(status);
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
