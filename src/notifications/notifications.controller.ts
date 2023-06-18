import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationsService } from './notifications.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { Notification } from './entities/notification.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNotificationInput } from './dto/create-notification.input';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly firebaseService: FirebaseService,
    ) {}

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    async getNotificationsInfinty(@Query('limit') limit: number, @Query('page') page: number, @Req() req){
        return this.notificationsService.findNotifications({limit, page, user: req.user})
    }

    //? -> dashboard...

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Notification})
    @UseInterceptors(FileInterceptor('image'))
    async createNotification(@Body() createNotificationInput: CreateNotificationInput, @UploadedFile() file) {
        return this.notificationsService.create(createNotificationInput, file);
    }

    // @Post('/')
    // sendPublic(){
    //     return this.firebaseService.sendPublic(" s");
    // }
}
