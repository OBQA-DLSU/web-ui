import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDiscussionComponent } from './assessment-discussion.component';

describe('AssessmentDiscussionComponent', () => {
  let component: AssessmentDiscussionComponent;
  let fixture: ComponentFixture<AssessmentDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
