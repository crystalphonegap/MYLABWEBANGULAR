import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterTestComponent } from './enter-test.component';

describe('EnterTestComponent', () => {
  let component: EnterTestComponent;
  let fixture: ComponentFixture<EnterTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
