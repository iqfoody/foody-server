import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateInput } from './dto/create-rate.input';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@UseGuards(FirebaseAuthGuard)
@Controller('rates')
export class RatesController {
    constructor(
        private readonly ratesService: RatesService,
    ) {}

    @Post('/driver')
    async createMeal(@Body('createRateInput') createRateInput: CreateRateInput, @Req() context) {
      return this.ratesService.rateDriver({...createRateInput, user: context.user});
    }

    // @Post('/restaurant')
    // async rate(@Body('createRateInput') createRateInput: CreateRateInput, @Req() context) {
    //   return this.ratesService.rateResaurant({...createRateInput, user: context.user});
    // }
}
