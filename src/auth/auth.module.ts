import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { UsersSchema } from './schemas/users.schema';
import { UsersRepository } from './repositories/users.repository';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema
      }
    ])
  ],
  controllers: [AuthController, UserController],
  providers: [UsersRepository]
})
export class AuthModule {}
