import { PartialType } from '@nestjs/swagger';
import { BuildJenkinDto } from './jenkin-build.dto';

export class UpdateJenkinDto extends PartialType(BuildJenkinDto) {}
