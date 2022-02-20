import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todos-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  inputValue: string = '';

  constructor(private todosService: TodoService) {}

  handleChange(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
  }

  addTodo(): void {
    if (this.inputValue.trim() === '') {
      return;
    }
    this.todosService.addTodo(this.inputValue);
    this.inputValue = '';
  }
}
