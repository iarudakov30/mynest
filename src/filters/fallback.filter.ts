import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log('FallbackExceptionFilter triggered', JSON.stringify(exception));

    const context: HttpArgumentsHost = host.switchToHttp();
    const response = context.getResponse();

    return response.status(500).json({
      statusCode: 500,
      errorMessage: exception.message || 'Unexpected error occurred',
      createdBy: 'HttpExceptionFilter'
    });
  }
}
