import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentPatientIdComponent } from './permanent-patient-id.component';

describe('PermanentPatientIdComponent', () => {
  let component: PermanentPatientIdComponent;
  let fixture: ComponentFixture<PermanentPatientIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermanentPatientIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentPatientIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
