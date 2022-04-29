import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { UsersService } from './users.service';
import { UserInfoResponse } from './vo/user-info';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('findAllUser')
  findAll() {
    return this.usersService.findAll();
  }


  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '添加用户', type: UserInfoResponse })
  @Post('addUser')
  async addUser(
    @Body() registerDTO: RegisterDTO
  ): Promise<UserInfoResponse> {
    return this.usersService.addUser(registerDTO)
  }

}
