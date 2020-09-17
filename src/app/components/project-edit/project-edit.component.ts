import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { AppState, selectAllProjectsList } from 'src/app/reducers';
import * as actions from '../../actions/todo.actions';
@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {


  @Input() toDoId: string;
  form: FormGroup;
  projects$: Observable<Project[]>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }



  ngOnInit(): void {
    this.projects$ = this.store.pipe(
      select(selectAllProjectsList)
    );
    this.form = this.formBuilder.group({
      project: ['', [Validators.required]]
    });
  }

  save(): void {
    console.log(this.toDoId);
    console.log(this.form.value);
    this.store.dispatch(actions.todoProjectEdit({
      ...this.form.value, id: this.toDoId
    }));
    this.form.reset();
    this.cancel();
  }
  cancel(): void {
    this.store.dispatch(actions.todoStartProjectEdit({ id: '' }));

  }
}
