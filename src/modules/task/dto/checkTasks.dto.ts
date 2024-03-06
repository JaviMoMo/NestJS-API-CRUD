import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CheckTasksDTO {
  @ApiProperty({ description: 'Check or uncheck the task' })
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty({
    description: 'Indicates the ID of the task to check or uncheck',
  })
  @IsNotEmpty()
  @IsString()
  taskId: string;
}
