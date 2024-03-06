import { Test, TestingModule } from '@nestjs/testing';
import { TasksFindAllByUserService } from './tasks-find-all-by-user.service';

describe('TasksFindAllByUserService', () => {
  let service: TasksFindAllByUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksFindAllByUserService],
    }).compile();

    service = module.get<TasksFindAllByUserService>(TasksFindAllByUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
