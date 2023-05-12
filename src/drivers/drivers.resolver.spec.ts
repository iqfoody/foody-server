import { Test, TestingModule } from '@nestjs/testing';
import { DriversResolver } from './drivers.resolver';
import { DriversService } from './drivers.service';

describe('DriversResolver', () => {
  let resolver: DriversResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriversResolver, DriversService],
    }).compile();

    resolver = module.get<DriversResolver>(DriversResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
