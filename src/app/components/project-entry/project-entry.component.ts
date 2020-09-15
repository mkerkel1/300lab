import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { AppState, selectAllProjectsList } from 'src/app/reducers';
import { projectAdded } from 'src/app/actions/project.actions';


@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  add(): void {
    console.log(this.form.value);
    this.store.dispatch(projectAdded({
      ...this.form.value
    }));
    this.form.reset();
  }

}
