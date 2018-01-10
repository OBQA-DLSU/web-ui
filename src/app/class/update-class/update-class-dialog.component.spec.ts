import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClassDialogComponent } from './update-class-dialog.component';

describe('UpdateClassComponent', () => {
  let component: UpdateClassDialogComponent;
  let fixture: ComponentFixture<UpdateClassDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClassDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
