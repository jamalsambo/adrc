/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: {
    id: any;
    displayName: any;
    userType: any;
    delegationId: string,
    employee: any
  }) {
    const payload = {
      sub: user.id,
      displayName: user.displayName,
      delegationId: user.delegationId,
      userType: user.userType.name,
    };
    
    const permissions = await this.userService.findPermissions(user.id);

    return {
      user: { ...payload, permissions },
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.findOneOrFail({ username });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
  // eslint-disable-next-line prettier/prettier
}
