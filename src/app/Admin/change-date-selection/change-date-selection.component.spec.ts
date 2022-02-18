import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDateSelectionComponent } from './change-date-selection.component';

describe('ChangeDateSelectionComponent', () => {
  let component: ChangeDateSelectionComponent;
  let fixture: ComponentFixture<ChangeDateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDateSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
