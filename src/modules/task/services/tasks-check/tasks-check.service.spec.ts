import { Test, TestingModule } from '@nestjs/testing';
import { TasksCheckService } from './tasks-check.service';

describe('TasksCheckService', () => {
  let service: TasksCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCheckService],
    }).compile();

    service = module.get<TasksCheckService>(TasksCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
