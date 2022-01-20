import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impvc2VqYWNvYjk5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHZRS3NkSi9ZS1BrTThPazRBZFZpVE9HMUcxY3cuRS5Fam45ODZTTXdXRExqb2pOTVh5NFJTIiwidXNlcklkIjoiNjEzMzYxYWFjZmEwN2I0YzE4MThkOWRjIiwic3ViIjoiNjEzMzYxYWFjZmEwN2I0YzE4MThkOWRjIiwiaWF0IjoxNjQyNTE4NTM0LCJleHAiOjE2NDI5NTA1MzR9.rABx3L6GHq6xbUhEGfX963eHCtx-1iB9ryU3spmJ1yo`

  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(request);
  }
}
