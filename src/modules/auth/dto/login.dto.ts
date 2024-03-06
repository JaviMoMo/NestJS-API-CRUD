import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ description: 'Email to login' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Password to login' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
