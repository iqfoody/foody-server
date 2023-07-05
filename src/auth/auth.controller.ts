import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';
import { DriversService } from 'src/drivers/drivers.service';
import { FirebaseAuthGuard } from 'src/firebase-auth/firebase-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly driversService: DriversService,
    ){}

    @Post('/login')
    @UseGuards(GqlAuthGuard)
    async login(@Body('loginUserInput') loginInput: LoginInput, @Req() req){
        return this.authService.login(req, loginInput);
    }

    @Post('/signup')
    async signup(@Body('createUserInput') createUserInput: CreateUserInput, @Req() req){
        return this.authService.signup(createUserInput, req);
    }

    @Get('/info')
    @UseGuards(FirebaseAuthGuard)
    async info(@Req() req){
        return this.usersService.info(req.user);
    }

    // drivers routes...

    @Post('/driver/login')
    async loginDriver(@Body() loginInput: LoginInput, @Req() req){
        return this.authService.loginDriver(req, loginInput);
    }

    @Get('/driver/info')
    @UseGuards(FirebaseAuthGuard)
    async infoDriver(@Req() req){
        return this.driversService.info(req.user);
    }

}
