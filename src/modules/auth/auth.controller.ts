import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginService } from './services/login/login.service';
import { LoginDTO } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'User logged' })
  @ApiResponse({ status: 403, description: 'Denegate access' })
  @Post()
  login(@Body() loginDTO: LoginDTO) {
    if (!loginDTO.email) {
      throw new HttpException('Email is empty', HttpStatus.BAD_REQUEST);
    }

    if (!loginDTO.password) {
      throw new HttpException('Password is empty', HttpStatus.BAD_REQUEST);
    }

    return this.loginService.createToken(loginDTO);
  }
}
