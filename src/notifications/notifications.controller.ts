import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { NotificationsService } from './notifications.service';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { Notification } from './entities/notification.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNotificationInput } from './dto/create-notification.input';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly firebaseService: FirebaseService,
    ) {}

    //TODO: AuthGuard
    @Get('/')
    async getMealsInfinty(@Query('limit') limit: number, @Query('page') page: number){
        const user = '';
        return this.notificationsService.findNotifications({limit, page, user})
    }

    //? -> dashboard...

    @Post('/')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Create, subject: Notification})
    @UseInterceptors(FileInterceptor('image'))
    async createRestaurant(@Body() createNotificationInput: CreateNotificationInput, @UploadedFile() file) {
        return this.notificationsService.create(createNotificationInput, file);
    }

    // @Post('/')
    // sendPublic(){
    //     return this.firebaseService.sendPublic(" s");
    // }
}
