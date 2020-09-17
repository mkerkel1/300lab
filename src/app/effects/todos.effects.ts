import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as actions from '../actions/todo.actions';
import { switchMap, tap, map } from 'rxjs/operators';
import { TodoEntity } from '../reducers/todos.reducer';
@Injectable()
export class TodosEffects {

  // todoAdded -> save it at the api -> todoAddedSuccess | todoAddedFailure
  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoAdded),
      switchMap((originalAction) => this.client.post<TodoEntity>(environment.apiUrl + 'todos', {
        name: originalAction.payload.name,
        project: originalAction.payload.project,
        dueDate: originalAction.payload.dueDate,
        completed: originalAction.payload.completed
      }).pipe(
        map(response => actions.todoAddedSucceeded({ oldId: originalAction.payload.id, payload: response }))
      ))
    ), { dispatch: true }
  );

  // loadTodos -> go to the api -> (loadTodosSucceeded | loadTodosFailed)

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadTodos),
      switchMap(() => this.client.get<{ data: TodoEntity[] }>(environment.apiUrl + 'todos')
        .pipe(
          map(response => actions.loadTodosSucceeded({ todos: response.data }))
        )
      ),
    ), { dispatch: true }
  );
  todoCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoCompleted),
      switchMap((originalAction) => this.client.post<any>(environment.apiUrl + 'todos/completed', { id: originalAction.id }).pipe(
        tap(r => console.log(r))
      )

      ),
    ), { dispatch: false }
  );
  todoProjectEdit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoProjectEdit),
      switchMap((originalAction) =>
        this.client.put<any>(environment.apiUrl + 'todos/' + originalAction.id + '/project', { value: originalAction.project }).pipe(
          tap(r => console.log(r))
        )

      ),
    ), { dispatch: false }
  );
  todoIncompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.todoIncompleted),
      switchMap((originalAction) => this.client.post<any>(environment.apiUrl + 'todos/incomplete', { id: originalAction.id }).pipe(
        tap(r => console.log(r))
      )

      ),
    ), { dispatch: false }
  );
  constructor(private actions$: Actions, private client: HttpClient) { }
}
