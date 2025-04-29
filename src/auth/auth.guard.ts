import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  async validateRequest(request: any) {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) return false;

    const user = await this.jwtService.verify(token);
    if (!user) return false;

    request.user = user;
    return true;
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }
}
