import { createAction, props } from '@ngrx/store';
import { ProjectEntity } from '../reducers/projects.reducer';

let tempId = 0;
export const loadProjects = createAction(
  '[projects] load projects'
);
export const loadProjectsSucceeded = createAction(
  '[projects] load projects succeeded',
  props<{ projects: ProjectEntity[] }>()
);

export const projectAdded = createAction(
  '[project] project added',
  ({ name }: { name: string }) => ({

    payload: {
      id: 'TEMP' + tempId++,
      name: name.trim().replace(' ', '-')
    } as ProjectEntity
  })
);

export const projectAddedSucceeded = createAction(
  '[project] todo added succeeded',
  props<{ oldId: string, payload: ProjectEntity }>()
);


