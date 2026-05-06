import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // you could access the data being sent back here
    // return next.handle().pipe(tap((data) => console.log('After...', data)));
    return next.handle().pipe(tap(() => console.log('After...')));
  }
}
