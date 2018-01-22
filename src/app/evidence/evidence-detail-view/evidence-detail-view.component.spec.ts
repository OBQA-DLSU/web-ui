import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceDetailViewComponent } from './evidence-detail-view.component';

describe('EvidenceDetailViewComponent', () => {
  let component: EvidenceDetailViewComponent;
  let fixture: ComponentFixture<EvidenceDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
