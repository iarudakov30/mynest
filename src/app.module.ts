import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { EventsModule } from './events/events.module';

import { GetUserMiddleware } from './middleware/get-user.middleware';

import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env['MONGO_CONNECTION']),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env['MONGO_CONNECTION'],
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
      logging: true
    }),
    ProductsModule,
    CoursesModule,
    AuthModule,
    AuthorsModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(GetUserMiddleware).forRoutes('*');
  }
}
