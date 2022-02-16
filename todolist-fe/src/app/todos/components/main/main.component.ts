import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { map, Observable } from 'rxjs';
import { TodoService } from '../../services/todo-service.service';
import { TodoInterface } from '../../types/interfaces';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  todoList$: Observable<TodoInterface[]>;
  editingId: string | null = null;

  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.todos$.pipe(
      map((todoItems) => todoItems.map((item) => item))
    );
  }

  ngOnInit(): void {
    this.todoService.getTodo();
  }

  getId(index: number, todo: TodoInterface): string {
    return todo.id;
  }

  setEditingId(id: string | null) {
    this.editingId = id;
  }
}
