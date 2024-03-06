import { Test, TestingModule } from '@nestjs/testing';
import { TasksDeleteService } from './tasks-delete.service';

describe('TasksDeleteService', () => {
  let service: TasksDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksDeleteService],
    }).compile();

    service = module.get<TasksDeleteService>(TasksDeleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
