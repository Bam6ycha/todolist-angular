import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToDoInterceptor } from '../todos/interceptor/todo-interceptor.service';
import { TodosModule } from '../todos/todos.module';
import { TodoService } from '../todos/services/todo-service.service';

const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ToDoInterceptor,
    multi: true,
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule, TodosModule, HttpClientModule],
  providers: [TodoService, httpInterceptorProviders],
})
export class CoreModule {}
