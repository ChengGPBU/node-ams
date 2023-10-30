import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    return next.handle().pipe(map(data => {
        if (request.url === '/file-upload/image') {
          return { data, ...data, code: 200, msg: 'success'}
        }
        return { data, code: 200, msg: 'success' }
    }));
  }
}
