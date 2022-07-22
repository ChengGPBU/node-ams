import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class BuildJenkinDto {
  @ApiProperty({
    description: '任务名称',
    example: '222',
  })
  @IsNotEmpty({ message: '任务名称' })
  @IsString({ message: '任务名称必须是string' })
  readonly jobName: string;
}
