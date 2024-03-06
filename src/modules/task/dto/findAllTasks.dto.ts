import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindAllTasksTasksDTO {
  @ApiProperty({
    description: 'Filter by completed tasks or not',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
