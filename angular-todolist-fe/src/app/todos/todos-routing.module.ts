import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTodoComponent } from './components/main-todo/main-todo.component';

const routes: Routes = [
  {
    path: '',
    component: MainTodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
