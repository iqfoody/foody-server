import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { Actions } from 'src/ability/ability.factory';
import { Rate } from './entities/rate.entity';
import { CreateRateInput } from './dto/create-rate.input';

@UseGuards(AccessAuthGuard)
@Controller('rates')
export class RatesController {
    constructor(
        private readonly ratesService: RatesService,
    ) {}

    @Post('/driver')
    @CheckAbilities({actions: Actions.Add, subject: Rate})
    async createMeal(@Body('createRateInput') createRateInput: CreateRateInput, @Req() context) {
      return this.ratesService.rateDriver({...createRateInput, user: context.user._id});
    }

    @Post('/restaurant')
    @CheckAbilities({actions: Actions.Add, subject: Rate})
    async rate(@Body('createRateInput') createRateInput: CreateRateInput, @Req() context) {
      return this.ratesService.rateResaurant({...createRateInput, user: context.user._id});
    }
}
