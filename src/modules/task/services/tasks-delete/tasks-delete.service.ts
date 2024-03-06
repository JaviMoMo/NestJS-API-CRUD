import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../../task.entity';
import { Model } from 'mongoose';
import { DeleteTasksDTO } from '../../dto/deleteTasks.dto';
import { JwtPayload } from 'src/modules/auth/interfaces/jwt-payload.interface';

@Injectable()
export class TasksDeleteService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async delete(
    deleteTasksDTO: DeleteTasksDTO,
    payload: JwtPayload,
  ): Promise<string> {
    try {
      const task = await this.taskModel.findById(deleteTasksDTO.taskId);

      if (!task || payload._id.toString() !== task.user.toString()) {
        throw new Error();
      }

      await this.taskModel.deleteOne({ _id: deleteTasksDTO.taskId });

      return `Task: "${task.name}" is deleted`;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
