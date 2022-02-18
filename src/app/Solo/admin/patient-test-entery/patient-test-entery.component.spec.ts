import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTestEnteryComponent } from './patient-test-entery.component';

describe('PatientTestEnteryComponent', () => {
  let component: PatientTestEnteryComponent;
  let fixture: ComponentFixture<PatientTestEnteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTestEnteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTestEnteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
