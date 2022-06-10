import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationService } from './application.service';
import { QueryAppListDTO } from './dto/queryapp.dto';
import { CreateBrandDTO } from './dto/createbrand.dto';
import { CreateAppDTO } from './dto/createapp.dto';

@Controller('/application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // 查询应用列表
  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  async queryAppList(@Query() query) {
    const {pageSize, pageNum, type} = query;
    const queryAppListDTO: QueryAppListDTO = {
      pageSize,
      pageNum,
      type
    }
    return this.applicationService.queryAppList(queryAppListDTO);
  }

  // 创建app
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createApp(@Body() createAppDTO: CreateAppDTO) {
    return this.applicationService.createApp(createAppDTO);
  }

  // 创建品牌groug
  @UseGuards(AuthGuard('jwt'))
  @Post('/createBrand')
  async createBrand(@Body() createBrandDTO: CreateBrandDTO) {
    return this.applicationService.createBrand(createBrandDTO);
  }

  // 查询品牌列表
  @UseGuards(AuthGuard('jwt'))
  @Get('/queryBrandList')
  async queryBrandList() {
    return this.applicationService.queryBrandList();
  }



   // 查询品牌下子项目
   @UseGuards(AuthGuard('jwt'))
   @Get('/queryBrand')
   async queryBrandDetail(@Query() query) {
     console.log("~~~~~~~~~~~~~~~~~~queryBrandDetail", query);
     const {brandId = 1} = query
     const params = {
      brandId,
     }
     return this.applicationService.queryBrandDetail(params);
   }
}
