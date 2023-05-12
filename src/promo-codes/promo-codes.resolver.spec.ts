import { Test, TestingModule } from '@nestjs/testing';
import { PromoCodesResolver } from './promo-codes.resolver';
import { PromoCodesService } from './promo-codes.service';

describe('PromoCodesResolver', () => {
  let resolver: PromoCodesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoCodesResolver, PromoCodesService],
    }).compile();

    resolver = module.get<PromoCodesResolver>(PromoCodesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
