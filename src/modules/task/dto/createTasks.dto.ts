import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTasksDTO {
  @ApiProperty({ description: 'Name of the task' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
