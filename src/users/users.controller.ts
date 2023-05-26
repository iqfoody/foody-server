import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UsersService } from './users.service';
import { AwsService } from 'src/aws/aws.service';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { User } from './entities/user.entity';
import { PasswordUserInput } from './dto/password-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UpdateUserInfo } from './dto/update-info.input';
import { CreateUserInput } from './dto/create-user.input';

@UseGuards(AccessAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly awsService: AwsService,
      ) {}

    @Put('/profile')
    @CheckAbilities({actions: Actions.UpdateInfo, subject: User})
    @UseInterceptors(FileInterceptor('image'))
    async update(@Body() updateUserInfo: UpdateUserInfo, @UploadedFile() file, @Req() req){
        if(file){
          const result = await this.awsService.createImage(file, req.user._id);
          return this.usersService.update(req.user._id, {...updateUserInfo, image: result?.Key});
        } else {
          return this.usersService.update(req.user._id, updateUserInfo);
        }
    }

    @Post('/password')
    @CheckAbilities({actions: Actions.Password, subject: User})
    async password(@Body() passwordUserInput: PasswordUserInput, @Req() req){
        return this.usersService.password(req.user._id, passwordUserInput);
    }

    @Post('/')
    @CheckAbilities({actions: Actions.Create, subject: User})
    @UseInterceptors(FileInterceptor('image'))
    async createUser(@Body() createUserInput: CreateUserInput, @UploadedFile() file) {
      return this.usersService.createUser(createUserInput, file);
    }

    @Put('/')
    @CheckAbilities({actions: Actions.Update, subject: User})
    @UseInterceptors(FileInterceptor('image'))
    async updateUser(@Body() updateUserInput: UpdateUserInput, @UploadedFile() file) {
        const result = await this.awsService.createImage(file, updateUserInput.id);
      return this.usersService.updateUser(updateUserInput.id, {...updateUserInput, image: result?.Key});
    }

}
