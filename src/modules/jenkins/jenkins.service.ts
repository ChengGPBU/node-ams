import { Injectable } from '@nestjs/common';
import { BuildJenkinDto } from './dto/jenkin-build.dto';
import { UpdateJenkinDto } from './dto/update-jenkin.dto';
import { buildJob } from 'src/utils/jenkins-client';

@Injectable()
export class JenkinsService {
  buildJob(buildJenkinDto: BuildJenkinDto) {
    const { jobName } = buildJenkinDto
    buildJob(jobName)
    return 'This action start a new job';
  }

  findAll() {
    return `This action returns all jenkins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jenkin`;
  }

  update(id: number, updateJenkinDto: UpdateJenkinDto) {
    return `This action updates a #${id} jenkin`;
  }

  remove(id: number) {
    return `This action removes a #${id} jenkin`;
  }
}
