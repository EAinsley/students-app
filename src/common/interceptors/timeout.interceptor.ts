import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('BEFORE TimeoutInterceptor');
    return next.handle().pipe(
      tap(() => console.log('after TimeoutInterceptor')),
      timeout(3000),
      catchError((err) => {
        console.log('Error', err);
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err as unknown);
      }),
    );
  }
}
