import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';

const INVALID_CREDENTIALS_ERROR = {
  message: 'E-mail ou senha incorreta',
  error: 'Erro ao fazer o login',
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn({ email, password }: AuthDto): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      Logger.error('Invalid credentials for email: ' + email);
      throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);
    }

    if (await argon2.verify(user.passwordHash, password)) {
      const payload = {
        sub: user.email,
        id: user.id,
      };
      return {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      Logger.error('Invalid credentials for email: ' + email);
      throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);
    }
  }
}
