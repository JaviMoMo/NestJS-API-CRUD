import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskEntity } from './task.entity';
import { TaskController } from './task.controller';
import { TasksCreateService } from './services/tasks-create/tasks-create.service';
import { ValidateUserService } from '../auth/services/validate-user/validate-user.service';
import { User, UserEntity } from '../user/user.entity';
import { TasksFindAllByUserService } from './services/tasks-find-all-by-user/tasks-find-all-by-user.service';
import { TasksCheckService } from './services/tasks-check/tasks-check.service';
import { TasksDeleteService } from './services/tasks-delete/tasks-delete.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskEntity },
      { name: User.name, schema: UserEntity },
    ]),
  ],
  providers: [
    TasksCreateService,
    ValidateUserService,
    TasksFindAllByUserService,
    TasksCheckService,
    TasksDeleteService,
  ],
  controllers: [TaskController],
})
export class TaskModule {}
