import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { GraphQLError } from 'graphql/error';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(GraphQLError)
export class GraphqlFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.log('GraphqlFilter triggered', JSON.stringify(exception));

    GqlArgumentsHost.create(host);

    const context: HttpArgumentsHost = host.switchToHttp();
    const response = context.getResponse();

    return response.status(500).json({
      statusCode: 500,
      errorMessage: exception.message || 'MongoDB error',
      createdBy: 'GraphqlFilter'
    });
  }
}
