import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BigintInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          return this.transform(data);
        }
        return data;
      }),
    );
  }

  private transform(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'bigint') {
      return obj.toString();
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transform(item));
    }

    // Date و Prisma Decimal لهما toJSON خاص، فنتركهما كما هما وإلا يتحولان إلى {} أو {d, e, s}
    if (typeof obj.toJSON === 'function') {
      return obj;
    }

    if (typeof obj === 'object') {
      const result: any = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = this.transform(obj[key]);
        }
      }
      return result;
    }

    return obj;
  }
}