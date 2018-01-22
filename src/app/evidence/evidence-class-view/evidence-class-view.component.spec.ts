import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceClassViewComponent } from './evidence-class-view.component';

describe('EvidenceClassViewComponent', () => {
  let component: EvidenceClassViewComponent;
  let fixture: ComponentFixture<EvidenceClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
