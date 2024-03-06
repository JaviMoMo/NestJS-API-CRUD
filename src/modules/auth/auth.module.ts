import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from '../user/user.entity';
import { LoginService } from './services/login/login.service';
import { ValidateUserService } from './services/validate-user/validate-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  providers: [LoginService, ValidateUserService],
  controllers: [AuthController],
})
export class AuthModule {}
