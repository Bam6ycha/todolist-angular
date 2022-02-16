import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { TodoInterface } from '../types/interfaces';

@Injectable()
export class ToDoInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<TodoInterface>,
    next: HttpHandler
  ): Observable<HttpEvent<TodoInterface>> {
    let url: string = '';

    if (!environment.production) {
      url = 'http://localhost:3004/todoList/';
    }

    const newRequest = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
      url: `${url}${request.url}`,
    });

    return next.handle(newRequest);
  }
}
