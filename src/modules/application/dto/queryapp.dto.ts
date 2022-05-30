import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PagingDTO } from 'src/dto/paging.dto';

export class QueryAppListDTO extends PagingDTO {
  @ApiProperty({
    description: '应用类型',
    example: 'mini',
    enum: ['mini', 'app', 'h5', 'bundle'],
  })
  @IsNotEmpty({ message: '应用类型' })
  readonly type: string;
}
