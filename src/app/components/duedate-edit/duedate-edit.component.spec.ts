import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuedateEditComponent } from './duedate-edit.component';

describe('DuedateEditComponent', () => {
  let component: DuedateEditComponent;
  let fixture: ComponentFixture<DuedateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuedateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuedateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
