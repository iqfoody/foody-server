import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private firebaseService: FirebaseService,
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
      if(request.headers.authorization) {
        const token = this.extractTokenFromHeader(request);
        if(!token) throw new UnauthorizedException('Access Denied')
        const checkAuth = await this.firebaseService.checkAuth(token);
        console.log(checkAuth)
        request['user'] = checkAuth;
        return true
      } return false;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
