import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyTestAddComponent } from './radiology-test-add.component';

describe('RadiologyTestAddComponent', () => {
  let component: RadiologyTestAddComponent;
  let fixture: ComponentFixture<RadiologyTestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyTestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologyTestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
