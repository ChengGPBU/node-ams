import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { RegisterDTO } from './dto/register.dto';
import { makeSalt, encryptPwd } from 'src/utils/cryptogram';
import { LoginDTO } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return await this.usersRepository.find(undefined);
  }

  async findOne(name: string): Promise<UsersEntity> {
    return await this.usersRepository
    .createQueryBuilder('users')
    .where('users.name = :name', {name})
    .getOne()  
  }


  /**
   * 注册用户
   * @param registerDTO 
   * @returns 
   */
  async addUser(
    registerDTO: RegisterDTO
  ): Promise<any> {
    const { name, password } = registerDTO;
    const salt = makeSalt(); // 制作密码盐
    const hashPassword = encryptPwd(password, salt);  // 加密密码
    const newUser: UsersEntity = new UsersEntity()
    newUser.name = name
    newUser.password = hashPassword 
    newUser.salt = salt
    const result = await this.usersRepository.save(newUser)
    delete result.password
    delete result.salt
    return {info: result}
  }

  /**
   * 校验用户
   * @param registerDTO 
   */
  async validateUser(loginDTO: LoginDTO): Promise<UsersEntity> {
    const { name, password } = loginDTO;
    const user = await this.usersRepository
    .createQueryBuilder('users')
    .where('users.name = :name', {name})
    .getOne()
    if (!user) {
      throw new NotFoundException(`User ${name} not exists`)
    }
    console.log("~~~~~xxx~~~~~", user)
    const { password: dbPwd, salt } = user
    const currentHashPwd = encryptPwd(password, salt)
    if (currentHashPwd !== dbPwd) {
      throw new NotFoundException('密码错误')
    }
    return user
  }

}
