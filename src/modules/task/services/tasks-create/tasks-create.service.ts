import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTasksDTO } from '../../dto/createTasks.dto';
import { Task } from '../../task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class TasksCreateService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(
    createTasksDTO: CreateTasksDTO,
    payload: JwtPayload,
  ): Promise<Task> {
    try {
      const newTask = new this.taskModel({
        ...createTasksDTO,
        user: payload._id,
      });

      newTask.name = createTasksDTO.name;
      newTask.isCompleted = false;

      return newTask.save();
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
