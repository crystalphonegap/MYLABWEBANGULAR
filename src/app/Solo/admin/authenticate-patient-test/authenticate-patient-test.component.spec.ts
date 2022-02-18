import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatePatientTestComponent } from './authenticate-patient-test.component';

describe('AuthenticatePatientTestComponent', () => {
  let component: AuthenticatePatientTestComponent;
  let fixture: ComponentFixture<AuthenticatePatientTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatePatientTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatePatientTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
