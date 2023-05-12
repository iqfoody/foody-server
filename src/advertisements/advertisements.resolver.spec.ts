import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisementsResolver } from './advertisements.resolver';
import { AdvertisementsService } from './advertisements.service';

describe('AdvertisementsResolver', () => {
  let resolver: AdvertisementsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvertisementsResolver, AdvertisementsService],
    }).compile();

    resolver = module.get<AdvertisementsResolver>(AdvertisementsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
