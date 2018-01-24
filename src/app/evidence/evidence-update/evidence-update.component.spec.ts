import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceUpdateComponent } from './evidence-update.component';

describe('EvidenceUpdateComponent', () => {
  let component: EvidenceUpdateComponent;
  let fixture: ComponentFixture<EvidenceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvidenceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
