import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSystemListComponent } from './payment-system-list.component';

describe('PaymentSystemListComponent', () => {
  let component: PaymentSystemListComponent;
  let fixture: ComponentFixture<PaymentSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSystemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
