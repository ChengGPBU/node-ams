import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PagingDTO {

  @ApiProperty({
    description: '查询第几页',
    example: 1,
  })
  @IsNotEmpty({ message: '第几页' })
  readonly pageNum: number;

  @ApiProperty({
    description: '查询数量',
    example: 10,
  })
  @IsNotEmpty({ message: '数据长度' })
  readonly pageSize: number;
}
