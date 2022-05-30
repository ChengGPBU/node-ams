import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppDTO {
  @ApiProperty({
    description: '应用名称',
    example: '就享买-微信小程序',
  })
  @IsNotEmpty({ message: '应用名称' })
  readonly name: string;

  @ApiProperty({
    description: '应用标识(对应jenkins任务)',
    example: 'jxm-weapp-program',
  })
  @IsNotEmpty({ message: '应用标识' })
  readonly identify: string;

  @ApiProperty({
    description: '品牌id',
    example: '11',
  })
  @IsNotEmpty({ message: '品牌id' })
  brandId: number;

  @ApiProperty({
    description: '品牌名称',
    example: 'jxm',
  })
  @IsNotEmpty({ message: '品牌名称' })
  brandName: string;

  @ApiProperty({
    description: '应用类型',
    enum: ['h5', 'mini', 'rn', 'app'],
    example: 'mini',
  })
  @IsNotEmpty({ message: '应用平台' })
  appType: string;

  @ApiProperty({
    description: '应用平台',
    enum: ['android', 'iOS', 'h5', 'weapp', 'tt', 'alipay'],
    example: 'weapp',
  })
  @IsNotEmpty({ message: '应用平台' })
  appPlatform: string;

  @ApiProperty({
    description: '应用logo',
    example: 'http://xxx',
  })
  @IsNotEmpty({ message: '应用logo' })
  logo: string;

  // 描述
  @ApiProperty({
    description: '应用描述',
    example: '这是一个微信小程序',
  })
  @IsNotEmpty({ message: '应用描述' })
  describe: string;
}
