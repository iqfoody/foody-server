import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws/aws.service';
import { CreateAdvertisementInput } from './dto/create-advertisement.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { Advertisement } from './entities/advertisement.entity';
import { UpdateAdvertisementInput } from './dto/update-advertisement.input';

@Controller('advertisements')
export class AdvertisementsController {
    constructor(
        private readonly advertisementsService: AdvertisementsService,
        private readonly awsService: AwsService,
    ){}

    @Get('/')
    async getAdvertisements(){
        return this.advertisementsService.findAdvertisements();
    }

    @Get('/s/:id')
    async getAdvertisement(@Param('id') id: string){
        return this.advertisementsService.findAdvertisement(id);
    }

    // dashboard...

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Advertisement})
    @UseInterceptors(FileInterceptor('image'))
    async createAdvertisement(@Body('createAdvertisementInput') createAdvertisementInput: CreateAdvertisementInput, @UploadedFile() file) {
      return this.advertisementsService.create(createAdvertisementInput, file);
    }

    @Put('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Update, subject: Advertisement})
    @UseInterceptors(FileInterceptor('image'))
    async updateAdvertisement(@Body('updateAdvertisementInput') updateAdvertisementInput: UpdateAdvertisementInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateAdvertisementInput.id);
      return this.advertisementsService.update(updateAdvertisementInput.id, {...updateAdvertisementInput, image: result?.Key});
    }
}
