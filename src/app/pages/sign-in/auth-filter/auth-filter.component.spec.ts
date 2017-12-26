import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFilterComponent } from './auth-filter.component';

describe('AuthFilterComponent', () => {
  let component: AuthFilterComponent;
  let fixture: ComponentFixture<AuthFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
