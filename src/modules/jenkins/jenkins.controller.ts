import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JenkinsService } from './jenkins.service';
import { BuildJenkinDto } from './dto/jenkin-build.dto';
import { UpdateJenkinDto } from './dto/update-jenkin.dto';

@Controller('jenkins')
export class JenkinsController {
  constructor(private readonly jenkinsService: JenkinsService) {}

  @Post('buildJob')
  buildJob(@Body() buildJenkinDto: BuildJenkinDto) {
    return this.jenkinsService.buildJob(buildJenkinDto);
  }
}
