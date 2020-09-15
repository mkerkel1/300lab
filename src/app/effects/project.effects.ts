import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as actions from '../actions/project.actions';
import { switchMap, tap, map } from 'rxjs/operators';
import { ProjectEntity } from '../reducers/projects.reducer';
@Injectable()
export class ProjectEffects {


  // loadTodos -> go to the api -> (loadTodosSucceeded | loadTodosFailed)
  savepPoject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.projectAdded),
      switchMap((originalAction) => this.client.post<ProjectEntity>(environment.apiUrl + 'projects', {
        name: originalAction.payload.name,
      }).pipe(
        map(response => actions.projectAddedSucceeded({ oldId: originalAction.payload.id, payload: response }))
      ))
    ), { dispatch: true }
  );

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadProjects),
      switchMap(() => this.client.get<{ data: ProjectEntity[] }>(environment.apiUrl + 'projects')
        .pipe(
          map(response => actions.loadProjectsSucceeded({ projects: response.data }))
        )
      ),
    ), { dispatch: true }
  );


  constructor(private actions$: Actions, private client: HttpClient) { }
}
