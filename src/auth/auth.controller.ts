import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { RefreshAuthGuard } from 'src/guards/refreshAuth.guard';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { User } from 'src/users/entities/user.entity';
import { Driver } from 'src/drivers/entities/driver.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly driversService: DriversService,
    ){}

    @Post('/login')
    @UseGuards(GqlAuthGuard)
    async login(@Body() loginInput: LoginInput, @Req() req){
        return this.authService.login(req, loginInput);
    }

    @Post('/signup')
    async signup(@Body() createUserInput: CreateUserInput, @Req() req){
        return this.authService.signup(createUserInput, req);
    }

    @Post('/logout')
    @UseGuards(AccessAuthGuard)
    async logout(@Req() req){
        return this.authService.logout(req, "User");
    }

    @Get('/info')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Info, subject: User})
    async info(@Req() req){
        return this.usersService.info(req.user._id);
    }

    @Get('/refresh')
    @UseGuards(RefreshAuthGuard)
    @CheckAbilities({actions: Actions.Refresh, subject: User})
    async refresh(@Req() req){
        return this.authService.refresh(req, "User");
    }

    // drivers routes...

    @Post('/driver/login')
    async loginDriver(@Body() loginInput: LoginInput, @Req() req){
        return this.authService.loginDriver(req, loginInput);
    }

    @Post('/driver/logout')
    @UseGuards(AccessAuthGuard)
    async logoutDriver(@Req() req){
        return this.authService.logout(req, "Driver");
    }

    @Get('/driver/info')
    @UseGuards(AccessAuthGuard)
    @CheckAbilities({actions: Actions.Info, subject: Driver})
    async infoDriver(@Req() req){
        return this.driversService.info(req.user._id);
    }

    @Get('/driver/refresh')
    @UseGuards(RefreshAuthGuard)
    @CheckAbilities({actions: Actions.Refresh, subject: Driver})
    async refreshDriver(@Req() req){
        return this.authService.refresh(req, "Driver");
    }
}
