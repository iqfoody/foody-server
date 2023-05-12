import { Controller, Post } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('notifications')
export class NotificationsController {
    constructor(
        private readonly firebaseService: FirebaseService,
    ) {}

    @Post('/')
    async sendPublic(){
        await this.firebaseService.sendPublic({test: "test"});
        return "Success";
    }
}
