import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { LoginAdmin } from './entities/loginAdmin.entity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { RefreshAuthGuard } from 'src/guards/refreshAuth.guard';
import { Admin } from 'src/admins/entities/admin.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginAdmin)
  loginAdmin(@Args('loginAdminInput') loginAdminInput: LoginInput, @Context() context: any,) {
    return this.authService.loginAdmin(context, loginAdminInput);
  }

  @Query(() => Admin, { name: 'infoAdmin' })
  @UseGuards(RefreshAuthGuard)
  infoAdmin(@Context() context) {
    return this.authService.findInfoAdmin(context);
  }

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
