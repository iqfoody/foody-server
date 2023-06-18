import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('promo-codes')
export class PromoCodesController {
    constructor(
        private readonly promoCodesService: PromoCodesService,
    ) {}

    @Get('/')
    async checkPromoCode(@Query('promoCode') name: string, @Req() req){
        return this.promoCodesService.check(name, req.user);
    }

    @Get('/self')
    async getPromoCodes(@Req() req){
        return this.promoCodesService.findPromoCodes(req.user);
    }

}
