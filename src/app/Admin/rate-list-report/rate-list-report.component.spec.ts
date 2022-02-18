import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateListReportComponent } from './rate-list-report.component';

describe('RateListReportComponent', () => {
  let component: RateListReportComponent;
  let fixture: ComponentFixture<RateListReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateListReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateListReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
