import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MainTodoComponent } from './components/main-todo/main-todo.component';
import { MainComponent } from './components/main/main.component';
import { TodoDirective } from './directives/todo.directive';
import { UpperCasePipePipe } from './pipes/upper-case-pipe.pipe';
import { TodoComponent } from './components/todo/todo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    MainTodoComponent,
    MainComponent,
    TodoDirective,
    UpperCasePipePipe,
    TodoComponent,
  ],
  imports: [CommonModule, TodosRoutingModule, SharedModule],
})
export class TodosModule {}
