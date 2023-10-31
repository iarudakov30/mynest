import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CoursesModule } from './courses/courses.module';
import { MONGO_CONNECTION } from './constants';
import { AuthModule } from './auth/auth.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONNECTION),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }),
    ProductsModule,
    CoursesModule,
    AuthModule,
    AuthorsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(GetUserMiddleware).forRoutes('*');
  }
}
