import { Controller, Get, Param } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';

@Controller('advertisements')
export class AdvertisementsController {
    constructor(
        private readonly advertisementsService: AdvertisementsService,
    ){}

    @Get('/')
    async getAdvertisements(){
        return this.advertisementsService.findAdvertisements();
    }

    @Get('/:id')
    async getAdvertisement(@Param('id') id: string){
        return this.advertisementsService.findAdvertisement(id);
    }

}
