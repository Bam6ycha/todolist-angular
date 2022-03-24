import {
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TodoService } from '../../services/todo-service.service';
import { TodoInterface } from '../../types/interfaces';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  @Input('todo') todoProps!: TodoInterface;
  @Input('isEditable') isEditableProps: boolean = false;

  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> =
    new EventEmitter();

  @ViewChild('textInput') textInput!: ElementRef<HTMLInputElement>;

  isCompleted: boolean = false;
  editingText: string = '';

  constructor(private todoService: TodoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditableProps'] && changes['isEditableProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
    this.isCompleted = this.todoProps.isCompleted;
  }

  removeTodo(id: string) {
    this.todoService.removeTodo(id);
  }

  toggleTodo(isCompleted: MatCheckboxChange) {
    this.isCompleted = isCompleted.checked;
    this.todoService.toggleComplete(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todoService.changeTodo(this.todoProps.id, this.editingText);
    this.setEditingIdEvent.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }
}
