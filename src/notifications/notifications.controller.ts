import { Controller, Get, Post, Query } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly firebaseService: FirebaseService,
    ) {}

    @Get('/main')
    async getMealsInfinty(@Query('limit') limit: number, @Query('page') page: number){
        //return this.firebaseService.findNotifications({limit, page})
        return;
    }

    @Post('/')
    async sendPublic(){
        await this.firebaseService.sendPublic({test: "test"});
        return "Success";
    }
}
