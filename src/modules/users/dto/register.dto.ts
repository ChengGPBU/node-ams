import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator"

export class RegisterDTO {
    @ApiProperty({
      description: '用户名',
      example: '222'
    })
    @IsNotEmpty({ message: '请输入用户昵称' })
    @IsString({ message: '名字必须是 String 类型'})
    readonly name: string;
  
    @ApiProperty({
      description: '用户密码',
      example: '123456',
    })
    @IsNotEmpty({ message: '密码' })
    readonly password: string;
  }
  