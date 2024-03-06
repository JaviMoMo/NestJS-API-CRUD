import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../../task.entity';
import { Model } from 'mongoose';
import { CheckTasksDTO } from '../../dto/checkTasks.dto';
import { JwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class TasksCheckService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async check(
    checkTasksDTO: CheckTasksDTO,
    payload: JwtPayload,
  ): Promise<Task> {
    try {
      const task = await this.taskModel.findById(checkTasksDTO.taskId);

      if (!task || payload._id.toString() !== task.user.toString()) {
        throw new Error();
      }

      task.isCompleted = checkTasksDTO.isCompleted;

      return task.save();
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
