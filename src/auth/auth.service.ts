import { Injectable, NotFoundException, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CookieOptions } from 'express';
import { constants } from 'src/constants/enums';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AdminsService } from 'src/admins/admins.service';
import { DriversService } from 'src/drivers/drivers.service';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  public cookieOptions: CookieOptions;
  public cookieRefreshOptions: CookieOptions;
  public accessOptions : any;
  public refreshOptions : any;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private adminsService: AdminsService,
    private driversService: DriversService,
  ) {
    this.cookieOptions = {
      domain: 'https://admin.iqfoody.com', // <- change it to your client domain... -> https://admin.iqfoody.com
      secure: true, // <- should be true in production...
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
      maxAge: 1000*60*60*24
    };
    this.cookieRefreshOptions = {
      domain: 'https://admin.iqfoody.com', // <- change it to your client domain... -> https://admin.iqfoody.com
      secure: true, // <- should be true in production...
      sameSite: 'lax',
      httpOnly: true,
      path: '/',
      maxAge: 1000*60*60*24*90
    };
    this.accessOptions = { secret: process.env.ACCESS_TOKEN_USERS, expiresIn: constants.jwtAccess };
    this.refreshOptions = { secret: process.env.REFRESH_TOKEN_USERS, expiresIn: constants.jwtRefresh };
  }

  async validateUser(phoneNumber: string) {
    //if(loginInput.password.length < 6) throw new BadRequestException('password E0004');
    const user = await this.usersService.findByPhoneNumber(phoneNumber);
    if (user) return user;
    throw new BadRequestException('phoneNumber E0010');
  }

  async login(context: any, loginInput: LoginInput) {
    const ip: string = context?.ip;
    const platform: string = context?.get('user-agent');
    await this.usersService.updateAny(context.user._id, {ip, platform, deviceToken: loginInput?.deviceToken});
    return context.user;
  }

  async loginAdmin(context: any, loginInput: LoginInput) {
    if(loginInput.password.length < 6) throw new Error('password E0004');
    const admin = await this.adminsService.login(loginInput);
    if(!admin) throw new Error('email E0001');
    const result = await this.getTokens(admin, "Admin");
    const refreshToken = await hash(result.refreshToken, 10)
    const ip: string = context.req?.ip;
    const platform: string = context.req?.get('user-agent');
    await this.adminsService.updateAdmin(admin._id, {refreshToken, ip, platform, deviceToken: loginInput.deviceToken});
    context.res.cookie('osk', result.accessToken, this.cookieOptions);
    context.res.cookie('iop', result.refreshToken, this.cookieRefreshOptions);
    return result;
  }

  async loginDriver(context: any, loginInput: LoginInput) {
    if(loginInput.password.length < 6) throw new Error('password E0004');
    const driver = await this.driversService.login(loginInput);
    if(!driver) throw new Error('email E0001');
    const result = await this.getTokens(driver, "Driver");
    const refreshToken = await hash(result.refreshToken, 10)
    const ip: string = context.ip;
    const platform: string = context?.get('user-agent');
    await this.driversService.updateAny(driver._id, {refreshToken, ip, platform, deviceToken: loginInput.deviceToken});
    return result;
  }

  async signup(createUserInput: CreateUserInput, context: any) {
    if(createUserInput.password.length < 6) throw new BadRequestException('password E0004');
    if(createUserInput?.phoneNumber){
      let E0011 = await this.usersService.findByPhoneNumber(createUserInput?.phoneNumber);
      if(E0011) throw new BadRequestException('phoneNumber E0011')
    }
    const ip: string = context?.ip;
    const platform: string = context?.get('user-agent');
    const user = await this.usersService.create({...createUserInput, ip, platform});
    const result = await this.getTokens(user, "User");
    const refreshToken = await hash(result.refreshToken, 10)
    await this.usersService.updateAny(user._id, {refreshToken});
    result.user.refreshToken = result.refreshToken;
    return {user: result.user, accessToken: result.accessToken};
  }

  async logout(context: any, type: string) {
    if(type === "User"){
      await this.usersService.logout(context.user._id);
      return 'success';
    } else if (type === "Admin"){
      await this.adminsService.logout(context.req.user._id);
    } else if (type === "Driver"){
      await this.driversService.logout(context.user._id);
    }
    context.res.cookie('osk', '', {...this.cookieOptions, maxAge: 0});
    context.res.cookie('iop', '', {...this.cookieOptions, maxAge: 0});
    return 'success';
  }

  async refresh(context: any, type: string) {
    if(type === "User"){
      const user = await this.usersService.refresh(context.user._id, context.user.refreshToken);
      const accessToken = await this.getNewAccessToken(user, "User");
      return accessToken;
    } else if(type === "Driver") {
      const driver = await this.driversService.refresh(context.user._id, context.user.refreshToken);
      const accessToken = await this.getNewAccessToken(driver, "Driver");
      return accessToken;
    } else {
      const admin = await this.adminsService.refresh(context.req.user._id, context.req.user.refreshToken);
      const accessToken = await this.getNewAccessToken(admin, "Admin");
      context.res.cookie('osk', accessToken, this.cookieOptions);
      return "success";
    }
  }

  async getTokens(user: any, metadata: string) {
    const userData = { _id: user?._id, type: user?.type, name: user?.name, phoneNumber: user?.phoneNumber, email: user?.email, metadata };
    const [at, rt] = await Promise.all([
      this.jwtService.sign( userData, this.accessOptions ),
      this.jwtService.sign( userData, this.refreshOptions ),
    ]);
    return { accessToken: at, refreshToken: rt, user };
  }

  async getNewAccessToken(user: any, metadata: string){
    const userData = { _id: user?._id, type: user?.type, name: user?.name, phoneNumber: user?.phoneNumber, email: user?.email, metadata };
    return this.jwtService.sign( userData, this.accessOptions )
  }

}
