import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateListAddComponent } from './rate-list-add.component';

describe('RateListAddComponent', () => {
  let component: RateListAddComponent;
  let fixture: ComponentFixture<RateListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateListAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
