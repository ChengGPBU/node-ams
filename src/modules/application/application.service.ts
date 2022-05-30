import { Injectable, Logger } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { CreateBrandDTO } from './dto/createbrand.dto';
import { QueryAppListDTO } from './dto/queryapp.dto';
import { BrandEntity } from './entity/brand.entity';
import { ApplicationEntity } from './entity/application.entity';
import { CreateAppDTO } from './dto/createapp.dto';
import { PagingDTO } from 'src/dto/paging.dto';

@Injectable()
export class ApplicationService {
  private readonly logger = new Logger(ApplicationService.name);

  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
  ) {}

  async queryAppList(queryAppListDTO: QueryAppListDTO): Promise<any> {
    const { pageSize, pageNum, type } = queryAppListDTO;
    const builder = this.applicationRepository
      .createQueryBuilder('application')
      .where('application.appType = :appType', { appType: type });

    const res = await builder
      .skip(pageSize * (pageNum - 1))
      .take(pageSize)
      .getManyAndCount();

    return res;
  }

  async createBrand(createBrandDTO: CreateBrandDTO): Promise<any> {
    const { brandName, logo, describe } = createBrandDTO;
    const brand = new BrandEntity();
    brand.brandName = brandName;
    brand.logo = logo;
    brand.describe = describe;
    let result;
    try {
      result = await this.brandRepository.save(brand);
    } catch (error) {
      console.log('~~~~~~~~~~~error~~~~~~', error);
    }
    return result;
  }

  async queryBrandList(): Promise<any> {
    const res = await this.brandRepository.find({
      relations: ['applications'],
    });
    return res;
  }

  async createApp(createAppDTO: CreateAppDTO): Promise<any> {
    const {
      name,
      identify,
      brandId,
      brandName,
      appPlatform,
      appType,
      logo,
      describe,
    } = createAppDTO;
    const app = new ApplicationEntity();
    app.appName = name;
    app.identify = identify;
    app.brandId = brandId;
    app.appType = appType;
    app.appPlatform = appPlatform;
    app.logo = logo;
    app.describe = describe;
    app.brandName = brandName;
    const res = await this.applicationRepository.save(app);
    return res;
  }

  async queryBrandDetail(query: { brandId: string }): Promise<any> {
    const {brandId} = query
    const list = await this.brandRepository.findOne(brandId, {relations: ['applications']})
    return list;
  }
}
