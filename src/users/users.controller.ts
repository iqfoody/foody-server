import { Body, Controller, Delete, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { AwsService } from 'src/aws/aws.service';
import { PasswordUserInput } from './dto/password-user.input';
import { UpdateUserInfo } from './dto/update-info.input';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly awsService: AwsService,
      ) {}

    @Put('/profile')
    @UseGuards(FirebaseAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async update(@Body() updateUserInfo: UpdateUserInfo, @UploadedFile() file, @Req() req){
        if(file){
          const result = await this.awsService.createRestImage(file, req.user);
          return this.usersService.update({...updateUserInfo, image: result?.Key, phoneNumber: req.user});
        } else {
          return this.usersService.update({...updateUserInfo, phoneNumber: req.user});
        }
    }

    @Delete('/')
    @UseGuards(FirebaseAuthGuard)
    async deleteAccount(@Req() req){
        return this.usersService.delete(req.user);
    }

}
