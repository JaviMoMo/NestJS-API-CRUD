import { Test, TestingModule } from '@nestjs/testing';
import { TasksCreateService } from './tasks-create.service';

describe('TasksCreateService', () => {
  let service: TasksCreateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksCreateService],
    }).compile();

    service = module.get<TasksCreateService>(TasksCreateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
