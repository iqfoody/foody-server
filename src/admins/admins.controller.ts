import { Controller, UseGuards, Post, Put, UseInterceptors, Body, UploadedFile, Req } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AwsService } from 'src/aws/aws.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { Admin } from './entities/admin.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@UseGuards(AccessAuthGuard)
@Controller('admins')
export class AdminsController {
    constructor(
        private readonly adminsService: AdminsService,
        private readonly awsService: AwsService
    ){}

    @Post('/')
    @CheckAbilities({actions: Actions.Create, subject: Admin})
    @UseInterceptors(FileInterceptor('image'))
    async createAdmin(@Body() createAdminInput: CreateAdminInput, @UploadedFile() file, @Req() context) {
      return this.adminsService.create(context.user._id, createAdminInput, file);
    }

    @Put('/')
    @CheckAbilities({actions: Actions.Update, subject: Admin})
    @UseInterceptors(FileInterceptor('image'))
    async updateAdmin(@Body() updateAdminInput: UpdateAdminInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateAdminInput.id);
      return this.adminsService.update(updateAdminInput.id, {...updateAdminInput, image: result?.Key});
    }
}
