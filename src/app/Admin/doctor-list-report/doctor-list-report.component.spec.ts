import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorListReportComponent } from './doctor-list-report.component';

describe('DoctorListReportComponent', () => {
  let component: DoctorListReportComponent;
  let fixture: ComponentFixture<DoctorListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
