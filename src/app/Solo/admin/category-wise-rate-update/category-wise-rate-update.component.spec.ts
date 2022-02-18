import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseRateUpdateComponent } from './category-wise-rate-update.component';

describe('CategoryWiseRateUpdateComponent', () => {
  let component: CategoryWiseRateUpdateComponent;
  let fixture: ComponentFixture<CategoryWiseRateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryWiseRateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseRateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
