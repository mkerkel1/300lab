import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo.actions';
export interface TodoEntity {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

export interface TodoState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState = adapter.getInitialState();


const reducerFunction = createReducer(
  initialState,
  on(actions.todoAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.loadTodosSucceeded, (state, action) => adapter.addMany(action.todos, state)),
  on(actions.todoAddedSucceeded, (state, action) => {
    // the old switcharoo
    const tempState = adapter.removeOne(action.oldId, state);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.todoIncompleted, (state, action) => {

    return adapter.updateOne({ id: action.id, changes: { completed: false } as Partial<TodoEntity> }, state);
  }),
  on(actions.todoCompleted, (state, action) => {

    return adapter.updateOne({ id: action.id, changes: { completed: true } as Partial<TodoEntity> }, state);
  })
);

export function reducer(state: TodoState = initialState, action: Action): TodoState {
  return reducerFunction(state, action);
}



