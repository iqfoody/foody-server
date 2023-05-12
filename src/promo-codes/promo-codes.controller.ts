import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { PromoCode } from './entities/promo-code.entity';

@UseGuards(AccessAuthGuard)
@Controller('promo-codes')
export class PromoCodesController {
    constructor(
        private readonly promoCodesService: PromoCodesService,
    ) {}

    @Get('/')
    @CheckAbilities({actions: Actions.Info, subject: PromoCode})
    async getOrderes(@Req() req){
        return this.promoCodesService.findPromoCodes(req.user._id);
    }

    @Patch('/:id')
    @CheckAbilities({actions: Actions.Info, subject: PromoCode})
    async checkPromoCode(@Param('id') name: string, @Req() req){
        return this.promoCodesService.check(name, req.user._id);
    }
}
