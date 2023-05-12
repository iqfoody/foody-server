import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseFilters, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { LoginInput } from './dto/login.input';
import { Login } from './entities/login.entity';
import { LoginAdmin } from './entities/loginAdmin.entity';
import { LoginDriver } from './entities/loginDriver.entity';
import { HttpExceptionFilter } from 'src/errors/http-exception.filter';
import { Signup } from './entities/signup.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { RefreshAuthGuard } from 'src/guards/refreshAuth.guard';
import { Admin } from 'src/admins/entities/admin.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Mutation(() => Login)
  // @UseGuards(GqlAuthGuard)
  // login(@Args('loginUserInput') loginUserInput: LoginInput, @Context() context: any,) {
  //   return this.authService.login(context, loginUserInput);
  // }

  @Mutation(() => LoginAdmin)
  loginAdmin(@Args('loginAdminInput') loginAdminInput: LoginInput, @Context() context: any,) {
    return this.authService.loginAdmin(context, loginAdminInput);
  }

  // @Mutation(() => LoginDriver)
  // loginDriver(@Args('loginDriverInput') loginDriverInput: LoginInput, @Context() context: any,) {
  //   return this.authService.loginDriver(context, loginDriverInput);
  // }

  // @Mutation(() => Signup)
  // @UseFilters(HttpExceptionFilter)
  // async signup(@Args('createUserInput') createUserInput: CreateUserInput, @Context() context: any ) {
  //   return this.authService.signup(createUserInput, context);
  // }

  @Mutation(() => String)
  @UseGuards(AccessAuthGuard)
  async logoutAdmin(@Context() context: any) {
    return this.authService.logout(context, "Admin");
  }

  @Query(() => String)
  @UseGuards(RefreshAuthGuard)
  async refresh(@Context() context: any) {
    return this.authService.refresh(context, "Admin");
  }

}
