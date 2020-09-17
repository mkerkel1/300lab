import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/todos.reducer';

export const todoItemSorted = createAction(
  '[todo] todo item sorted',
  props<{ id: string, previousIndex: number, currentIndex: number }>()
);
export const todoCompleted = createAction(
  '[todo] todo item completed',
  props<{ id: string }>()
);

export const todoIncompleted = createAction(
  '[todo] todo item incompleted',
  props<{ id: string }>()
);


export const todoStartProjectEdit = createAction(
  '[todo] todo start project edit',
  props<{ id: string }>()
);

export const todoStartDateEdit = createAction(
  '[todo] todo start date edit',
  props<{ id: string }>()
);

let tempId = 0;
export const todoAdded = createAction(
  '[todo] todo item added',
  ({ name, project, dueDate }: { name: string, project: string, dueDate: string }) => ({

    payload: {
      id: 'TEMP' + tempId++,
      name,
      project,
      dueDate
    } as TodoEntity
  })
);


export const todoProjectEdit = createAction(
  '[todo] todo project edit',
  props<{ project: string, id: string }>()
);

export const todoAddedSucceeded = createAction(
  '[todo] todo added succeeded',
  props<{ oldId: string, payload: TodoEntity }>()
);

export const todoAddedFailed = createAction(
  '[todo] todo added failed',
  props<{ payload: TodoEntity, message: string }>()
);

export const loadTodos = createAction(
  '[todos] load todos'
);

export const loadTodosSucceeded = createAction(
  '[todos] load todos succeeded',
  props<{ todos: TodoEntity[] }>()
);

export const loadTodosFailed = createAction(
  '[todos] loading todos failed',
  props<{ error: string }>()
);


