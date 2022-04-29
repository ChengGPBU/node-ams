import { join } from 'path';
export default {
  type: 'mysql',
  host: '47.110.42.63',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'ams',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  synchronize: true,
};
