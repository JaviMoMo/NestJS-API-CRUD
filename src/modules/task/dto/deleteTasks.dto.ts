import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTasksDTO {
  @ApiProperty({ description: 'Indicates the ID of the taks to delete' })
  @IsNotEmpty()
  @IsString()
  taskId: string;
}
