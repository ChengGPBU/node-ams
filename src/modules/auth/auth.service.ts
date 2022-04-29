import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.usersService.validateUser(loginDTO)
    const token = this.certificate(user)
    return {
      token,
    };
  }


  async certificate(user: UsersEntity) {
    const payload = {name: user.name, id: user.id};
    const token = this.jwtService.sign(payload)
    console.log("~~~~~~~~~xxx", payload);

    return token
  }
}

