/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { UsersService } from 'src/users/users.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly refreshTokenStrategy: RefreshTokenStrategy,
    private readonly userService: UsersService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  @Get('resfresh-token')
  async refreshToken(@Req() req: any) {
    // eslint-disable-next-line prefer-const
    const token = req.headers['authorization'];
    const refreshToken = token.split(' ')[1];

    const validToken =
      await this.refreshTokenStrategy.validateRefreshToken(refreshToken);

    if (!validToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    const newAccessToken = await this.refreshTokenStrategy.generateRefreshToken(
      validToken.sub
    );
    const permissions = await this.userService.findPermissions(validToken.sub)

    return {
      token: newAccessToken,
      user: validToken,
      permissions,
    };
  }
}
