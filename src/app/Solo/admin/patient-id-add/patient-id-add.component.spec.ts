import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientIdAddComponent } from './patient-id-add.component';

describe('PatientIdAddComponent', () => {
  let component: PatientIdAddComponent;
  let fixture: ComponentFixture<PatientIdAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientIdAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientIdAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
