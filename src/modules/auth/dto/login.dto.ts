import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator"


export class LoginDTO {
    @ApiProperty({
      description: '用户名，唯一',
      example: '13049153466'
    })
    @IsNotEmpty({ message: '请输入用户名' })
    readonly name: string;
  
    @ApiProperty({
      description: '用户密码',
      example: '123456',
    })
    @IsNotEmpty({ message: '请输入密码' })
    readonly password: string;
  }