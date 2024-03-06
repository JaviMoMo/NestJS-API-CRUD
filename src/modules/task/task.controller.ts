import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTasksDTO } from './dto/createTasks.dto';
import { TasksCreateService } from './services/tasks-create/tasks-create.service';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { TasksFindAllByUserService } from './services/tasks-find-all-by-user/tasks-find-all-by-user.service';
import { CheckTasksDTO } from './dto/checkTasks.dto';
import mongoose from 'mongoose';
import { TasksCheckService } from './services/tasks-check/tasks-check.service';
import { DeleteTasksDTO } from './dto/deleteTasks.dto';
import { TasksDeleteService } from './services/tasks-delete/tasks-delete.service';
import { FindAllTasksTasksDTO } from './dto/findAllTasks.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('task')
@UseInterceptors(AuthInterceptor)
export class TaskController {
  constructor(
    private readonly tasksCreateService: TasksCreateService,
    private readonly tasksFindAllByUser: TasksFindAllByUserService,
    private readonly tasksCheckService: TasksCheckService,
    private readonly tasksDeleteService: TasksDeleteService,
  ) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created' })
  @ApiResponse({ status: 403, description: 'Denegate access' })
  @Post()
  create(@Request() req, @Body() createTasksDTO: CreateTasksDTO) {
    if (!createTasksDTO.name) {
      throw new HttpException('task Name is missing', HttpStatus.BAD_REQUEST);
    }
    return this.tasksCreateService.create(createTasksDTO, req.user);
  }

  @ApiOperation({ summary: 'Show all tasks by user logged' })
  @ApiResponse({ status: 201, description: 'See all taks' })
  @ApiResponse({ status: 403, description: 'Denegate access' })
  @Get()
  findAllByUser(@Request() req, @Body() findAllTasksDTO: FindAllTasksTasksDTO) {
    return this.tasksFindAllByUser.findAll(req.user, findAllTasksDTO);
  }

  @ApiOperation({ summary: 'Check or uncheck a task' })
  @ApiResponse({ status: 201, description: 'Task checked or unchecked' })
  @ApiResponse({ status: 403, description: 'Denegate access' })
  @Put('check')
  check(@Request() req, @Body() checkTasksDTO: CheckTasksDTO) {
    if (typeof checkTasksDTO.isCompleted !== 'boolean') {
      throw new HttpException(
        'isCompleted is not a boolean',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!mongoose.Types.ObjectId.isValid(checkTasksDTO.taskId)) {
      throw new HttpException(
        'taskId is not a MongoId',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tasksCheckService.check(checkTasksDTO, req.user);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 201, description: 'Task deleted' })
  @ApiResponse({ status: 403, description: 'Denegate access' })
  @Delete('delete')
  delete(@Request() req, @Body() deleteTaskDTO: DeleteTasksDTO) {
    if (!mongoose.Types.ObjectId.isValid(deleteTaskDTO.taskId)) {
      throw new HttpException(
        'taskId is not a MongoId',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tasksDeleteService.delete(deleteTaskDTO, req.user);
  }
}
