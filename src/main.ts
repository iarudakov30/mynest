import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import {
  INestApplication,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';
import { GraphqlFilter } from './filters/graphql.filter';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    // new ValidationFilter(),
    // new HttpExceptionFilter(),
    // new GraphqlFilter(),
    // new FallbackExceptionFilter()
  );
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error: ValidationError) => `${error.property} has wrong value ${
            error.value
          },
                ${Object.values(error.constraints).join(', ')} `
        );

        return new ValidationException(messages);
      }
    })
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
