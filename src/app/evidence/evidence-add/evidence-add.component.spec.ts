import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceAddDialogComponent } from './evidence-add-dialog.component';

describe('EvidenceAddDialogComponent', () => {
  let component: EvidenceAddDialogComponent;
  let fixture: ComponentFixture<EvidenceAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
