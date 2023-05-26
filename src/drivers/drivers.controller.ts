import { Body, Controller, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { AwsService } from 'src/aws/aws.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Actions } from 'src/ability/ability.factory';
import { Driver } from './entities/driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';

@UseGuards(AccessAuthGuard)
@Controller('drivers')
export class DriversController {
    constructor(
        private readonly driverService: DriversService,
        private readonly awsService: AwsService,
    ) {}

    @Post('/')
    @CheckAbilities({actions: Actions.Create, subject: Driver})
    @UseInterceptors(FileInterceptor('image'))
    async createDriver(@Body() createDriverInput: CreateDriverInput, @UploadedFile() file) {
      return this.driverService.create(createDriverInput, file);
    }

    @Put('/')
    @CheckAbilities({actions: Actions.Update, subject: Driver})
    @UseInterceptors(FileInterceptor('image'))
    async updateDriver(@Body() updateDriverInput: UpdateDriverInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateDriverInput.id);
      return this.driverService.update(updateDriverInput.id, {...updateDriverInput, image: result?.Key});
    }
}
