import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AdminsModule } from 'src/admins/admins.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { AwsModule } from 'src/aws/aws.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/guards/local.strategy';
import { AccessTokenStrategy } from 'src/guards/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/guards/refreshToken.strategy';
import { AbilityModule } from 'src/ability/ability.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [
    UsersModule,
    AdminsModule,
    DriversModule,
    JwtModule,
    AwsModule,
    AbilityModule,
    FirebaseModule
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
