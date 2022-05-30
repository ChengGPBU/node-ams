import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToMany,
} from 'typeorm';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'brand' })
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn()
  createTime: Date;

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;

  // 品牌名称
  @Column('text')
  brandName: string;

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

  @Column({
    type: 'text',
  })
  logo: string;

  @OneToMany(() => ApplicationEntity, application => application.brand)
  applications: ApplicationEntity[];
}
