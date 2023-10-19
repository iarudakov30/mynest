import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    console.log('HTTP exc handler triggered', JSON.stringify(exception));

    const context: HttpArgumentsHost = host.switchToHttp();
    const response = context.getResponse(),
      statusCode: number = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      errorMessage: exception.message,
      createdBy: 'HttpExceptionFilter'
    });
  }
}
