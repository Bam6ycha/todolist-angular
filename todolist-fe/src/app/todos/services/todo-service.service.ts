import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { TodoInterface } from '../types/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class TodoService {
  public todos$ = new BehaviorSubject<TodoInterface[]>([]);

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  public addTodo(text: string): void {
    const newTodo: TodoInterface = {
      text,
      isCompleted: false,
      id: Math.random().toString(16),
    };

    this.httpClient.post<TodoInterface>('', newTodo).subscribe((response) => {
      const updateTodos = [...this.todos$.getValue(), response];

      this.todos$.next(updateTodos);
    });
  }

  public getTodo(): void {
    this.httpClient.get<TodoInterface[]>(``).subscribe((response) => {
      retry(2);
      catchError(this.handleError);
      this.todos$.next(response);
    });
  }

  public removeTodo(todoId: string) {
    this.httpClient.delete(`${todoId}`).subscribe(() => {
      const newTodos = this.todos$.getValue().filter(({ id }) => id !== todoId);
      this.todos$.next(newTodos);
      catchError(this.handleError);
    });
  }

  public toggleComplete(itemId: string) {
    const updatedTodo = this.todos$.getValue().find(({ id }) => id === itemId);

    if (updatedTodo) {
      this.httpClient
        .patch(`${itemId}`, {
          isCompleted: !updatedTodo.isCompleted,
        })
        .subscribe((response: Partial<TodoInterface>) => {
          const newTodos = this.todos$.getValue().map((todo) => {
            if (todo.id === response.id) {
              return {
                ...todo,
                isCompleted: todo.isCompleted,
              };
            }
            return todo;
          });

          this.todos$.next(newTodos);
          catchError(this.handleError);
        });
    }
  }

  changeTodo(itemId: string, editingText: string) {
    this.httpClient
      .patch(`${itemId}`, {
        text: editingText,
      })
      .subscribe((response: Partial<TodoInterface>) => {
        const newTodos = this.todos$.getValue().map((todo) => {
          if (todo.id === response.id) {
            return {
              ...todo,
              text: editingText,
            };
          }
          return todo;
        });

        this.todos$.next(newTodos);
        catchError(this.handleError);
      });
  }
}
