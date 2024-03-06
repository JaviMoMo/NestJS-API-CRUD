import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../../task.entity';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';
import { FindAllTasksTasksDTO } from '../../dto/findAllTasks.dto';

@Injectable()
export class TasksFindAllByUserService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(
    payload: JwtPayload,
    findAllTasksDTO: FindAllTasksTasksDTO,
  ): Promise<Task[]> {
    try {
      return this.taskModel.find({
        user: payload._id,
        ...(findAllTasksDTO.isCompleted && {
          isCompleted: findAllTasksDTO.isCompleted,
        }),
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
