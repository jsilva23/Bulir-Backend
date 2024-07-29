import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

type UserWithoutSensitiveInfo = Omit<
  User,
  'passwordHash' | 'services' | 'reservations'
>;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Acesso negado! Faça o login para estar autenticado.',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtConstants,
      });
      const user = await this.usersService.findUserByEmail(payload.sub);

      const currentUser: UserWithoutSensitiveInfo = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        nif: user.nif,
        role: user.role,
        balance: user.balance,
      };

      request['currentUser'] = currentUser;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
