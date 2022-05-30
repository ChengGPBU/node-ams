import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBrandDTO {
  @ApiProperty({
    description: '品牌名称',
    example: 'jxm',
  })
  @IsNotEmpty({ message: '品牌名称' })
  brandName: string;

  @ApiProperty({
    description: '品牌logo',
    example: 'http://xxx',
  })
  @IsNotEmpty({ message: '品牌logo' })
  logo: string;

  // 描述
  @ApiProperty({
    description: '描述',
    example: '就享买',
  })
  @IsNotEmpty({ message: '描述' })
  describe: string;
}
