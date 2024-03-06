import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from './user.entity';
import { CreateUsersService } from './services/create-users/create-users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  providers: [CreateUsersService],
  controllers: [UserController],
})
export class UserModule {}
