import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
    ) {}

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    async getNotificationsInfinty(@Query('limit') limit: number, @Query('page') page: number, @Req() req){
        return this.notificationsService.findNotifications({limit, page, user: req.user})
    }

}
