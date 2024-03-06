import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUsersService } from './services/create-users/create-users.service';
import { CreateUsersDTO } from './dto/create-users.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly createUsersService: CreateUsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 403, description: 'Denegate access' })
  @Post()
  create(@Body() createUsersDTO: CreateUsersDTO) {
    if (!createUsersDTO.email) {
      throw new HttpException('Email is empty', HttpStatus.BAD_REQUEST);
    }

    if (!createUsersDTO.password) {
      throw new HttpException('Password is empty', HttpStatus.BAD_REQUEST);
    }

    return this.createUsersService.create(createUsersDTO);
  }
}
