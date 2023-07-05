import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { LimitEntity } from 'src/constants/limitEntity';
import { NotificationsResponse } from './entities/notificationsResponse.entity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Mutation(() => Notification)
  @CheckAbilities({actions: Actions.Create, subject: "Notification"})
  createNotification(@Args('createNotificationInput') createNotificationInput: CreateNotificationInput) {
    return this.notificationsService.create(createNotificationInput);
  }

  @Query(() => NotificationsResponse, { name: 'notifications' })
  @CheckAbilities({actions: Actions.Read, subject: "Notification"})
  findAll(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.notificationsService.findAll(limitEntity);
  }

  @Query(() => NotificationsResponse, { name: 'managementNotifications' })
  @CheckAbilities({actions: Actions.Read, subject: "Notification"})
  findManagement(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.notificationsService.findManagement(limitEntity);
  }

  @Query(() => Notification, { name: 'notification' })
  @CheckAbilities({actions: Actions.Read, subject: "Notification"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't notification with this id");
    return this.notificationsService.findOne(id);
  }

  @Mutation(() => Notification)
  @CheckAbilities({actions: Actions.Delete, subject: "Notification"})
  removeNotification(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't notification with this id");
    return this.notificationsService.remove(id);
  }
}
