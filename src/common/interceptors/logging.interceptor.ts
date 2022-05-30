import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

let requestSeq = 0;

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // 请求开始时间
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    const seq = requestSeq++;
    const urlInfo = `${request.method} ${request.url}`;
    const body = request.body
    console.info(`[${seq}]==> ${urlInfo}`);
    console.info("~~~请求入参~~~~", body);
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.info(`[${seq}]<== ${urlInfo} ${now - start} ms`)),
      );
  }
}
