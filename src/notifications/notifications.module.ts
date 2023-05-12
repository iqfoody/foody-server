import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsController } from './notifications.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule
  ],
  providers: [NotificationsResolver, NotificationsService],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
