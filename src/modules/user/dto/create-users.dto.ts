import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsersDTO {
  @ApiProperty({ description: 'Email to create a user' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Password to create a user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
