import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BrandEntity } from './brand.entity';

@Entity({ name: 'application' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn()
  createTime: Date;

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;

  // 描述
  @Column({
    type: 'text',
  })
  describe: string;

  // 软删除
  @Column({
    default: false,
  })
  isDeleted: boolean;

  // 更新次数
  @VersionColumn()
  version: number;

  @Column({ length: 20 })
  appName: string;

  @Column({
    type: 'text',
  })
  identify: string;

  @Column({
    type: 'text',
  })
  logo: string;

  @Column({
    type: 'enum',
    enum: ['h5', 'mini', 'rn', 'app'],
    default: 'mini',
    comment: '应用类型',
  })
  appType: string;

  @Column({
    type: 'enum',
    enum: ['android', 'iOS', 'h5', 'weapp', 'tt', 'alipay'],
    default: 'weapp',
    comment: '应用平台',
  })
  appPlatform: string;


  @Column({
    type: 'text',
    comment: '品牌名称',
  })
  brandName: string;


  @Column({
    type: 'int',
    comment: '品牌id',
  })
  brandId: number;

  @ManyToOne(() => BrandEntity, brand => brand.applications, {createForeignKeyConstraints: false})
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;
}
