import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentAddressPatientListComponent } from './permanent-address-patient-list.component';

describe('PermanentAddressPatientListComponent', () => {
  let component: PermanentAddressPatientListComponent;
  let fixture: ComponentFixture<PermanentAddressPatientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermanentAddressPatientListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentAddressPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
