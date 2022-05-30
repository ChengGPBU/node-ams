import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationController } from './application.controller';
import { jwtConstants } from './constants';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entity/brand.entity';
import { ApplicationEntity } from './entity/application.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([BrandEntity]),
    TypeOrmModule.forFeature([ApplicationEntity])
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
