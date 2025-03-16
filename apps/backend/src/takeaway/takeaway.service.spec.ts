import { Test, TestingModule } from '@nestjs/testing';
import { TakeawayService } from './takeaway.service';

describe('TakeawayService', () => {
  let service: TakeawayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TakeawayService],
    }).compile();

    service = module.get<TakeawayService>(TakeawayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
