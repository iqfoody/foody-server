import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { InjectModel } from '@nestjs/mongoose';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { AwsService } from 'src/aws/aws.service';
import { Model } from 'mongoose';
import { NotificationsDocument } from 'src/models/notifications.schema';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { OrdersService } from 'src/orders/orders.service';
import { LimitEntity } from 'src/constants/limitEntity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel("Notifications") private NotificationsModel: Model<NotificationsDocument>,
    @Inject(forwardRef(()=> UsersService)) private usersService: UsersService,
    @Inject(forwardRef(()=> DriversService)) private driversService: DriversService,
    @Inject(forwardRef(()=> AdminsService)) private adminsService: AdminsService,
    @Inject(forwardRef(()=> OrdersService)) private ordersService: OrdersService,
    @Inject(forwardRef(()=> MealsService)) private mealsService: MealsService,
    @Inject(forwardRef(()=> RestaurantsService)) private restaurantsService: RestaurantsService,
    private readonly firebaseService: FirebaseService,
    private readonly awsService: AwsService,
  ) {}

  //? -> application...

  async findNotifications(limitEntity: LimitEntity) {
    const { _id } = await this.usersService.findId(limitEntity?.user);
    const startIndex = limitEntity.limit * limitEntity.page;
    const notifications = await this.NotificationsModel.find({$or: [{type: "Public"}, {user: _id}]}).limit(limitEntity.limit).skip(startIndex).sort({_id: -1});
    const total = await this.NotificationsModel.countDocuments({$or: [{type: "Public"}, {user: _id}]});
    for(const single of notifications){
      if(single?.image) single.image = this.awsService.getUrl(single.image);
    }
    return {data: notifications, pages: Math.ceil(total/limitEntity.limit)};
  }

  async createVertual(createNotificationInput: CreateNotificationInput){
    const notification: any = await this.NotificationsModel.create(createNotificationInput);
    await this.firebaseService.sendPublicAdmin(notification);
    return "Success";
  }

  //? -> dashboard...

  async create(createNotificationInput: CreateNotificationInput) {
    const notification = new this.NotificationsModel(createNotificationInput);
    if(createNotificationInput?.image){
      const result = await this.awsService.createImage(createNotificationInput.image, notification._id);
      notification.image = result?.Key;
    }
    await notification.save();
    if(notification.image) notification.image = this.awsService.getUrl(notification.image);
    const finalResult: any = await notification.populate("user");
    if(finalResult.user?.image) finalResult.user.image = this.awsService.getUrl(finalResult.user.image);
    if(createNotificationInput.type === "Private" && createNotificationInput?.user){
      const user = await this.usersService.findDeviceToken(createNotificationInput.user);
      if(user?.deviceToken) await this.firebaseService.sendPrivate(finalResult, user.deviceToken);
    } else {
      await this.firebaseService.sendPublic(finalResult);
    }
    return finalResult;
  }

  async sendPrivate(createNotificationInput: CreateNotificationInput){
    const notification: any = new this.NotificationsModel(createNotificationInput);
    if(createNotificationInput?.user){
      const user = await this.usersService.findDeviceToken(createNotificationInput.user);
      if(user?.deviceToken) await this.firebaseService.sendPrivate(notification, user.deviceToken);
    } else if(createNotificationInput?.driver){
      const driver = await this.driversService.findDeviceToken(createNotificationInput.driver);
      if(driver?.deviceToken) await this.firebaseService.sendPrivate(notification, driver.deviceToken);
    }
    return;
  }

  async findAll(limitEntity: LimitEntity) {
      const startIndex = limitEntity.limit * limitEntity.page;
      const notifications: any = await this.NotificationsModel.find({$and: [{type: {$ne: "Vertual"}}, {type: {$ne: "Management"}}]}).limit(limitEntity.limit).skip(startIndex).sort({_id: -1}).populate("user");
      const total = await this.NotificationsModel.countDocuments({$and: [{type: {$ne: "Vertual"}}, {type: {$ne: "Management"}}]});
      for(const single of notifications){
        if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
      }
      return {data: notifications, pages: Math.ceil(total/limitEntity.limit)};
  }

  async findManagement(limitEntity: LimitEntity){
    let unRead: boolean = false;
    const startIndex = limitEntity.limit * limitEntity.page;
    const notifications: any = await this.NotificationsModel.find({type: "Management"}).limit(limitEntity.limit).skip(startIndex).sort({_id: -1}).populate("user");
    const total = await this.NotificationsModel.countDocuments({type: "Management"});
    for(const single of notifications){
      if(single.user?.image) single.user.image = this.awsService.getUrl(single.user.image);
      if(single?.image) single.image = this.awsService.getUrl(single.image);
      if(single.state === "Unread") unRead = true;
    }
    if(unRead) this.NotificationsModel.updateMany({$and: [{state: "Unread"}, {type: "Management"}]}, {state: "Read"});
    const orders = await this.ordersService.findUnread();
    return {data: notifications, pages: Math.ceil(total/limitEntity.limit), orders};
  }

  async findOne(id: string) {
    const notification: any = await this.NotificationsModel.findById(id).populate("user");
    if(notification.user?.image) notification.user.image = this.awsService.getUrl(notification.user.image);
    if(notification?.image) notification.image = this.awsService.getUrl(notification.image);
    return notification;
  }

  async remove(id: string) {
    const {image} = await this.NotificationsModel.findOne({_id: id}, {image: 1, _id: 0});
    await this.NotificationsModel.findByIdAndDelete(id);
    if(image) this.awsService.removeImage(image);
    return "Success";
  }
}
