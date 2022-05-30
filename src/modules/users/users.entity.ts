import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 常见时间
  @CreateDateColumn()
  createTime: Date;

  // 更新时间
  @UpdateDateColumn()
  updateTime: Date;

  // 软删除
  @Column({
    default: false
  })
  isDeleted: boolean


  // 更新次数
  @VersionColumn()
  version: number


  @Column({ length: 20 })
  name: string;

  @Column('text')
  password: string;


  @Column('text')
  salt: string;

  @Column({default: true})
  status: boolean;

}
