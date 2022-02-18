import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDetailEditComponent } from './test-detail-edit.component';

describe('TestDetailEditComponent', () => {
  let component: TestDetailEditComponent;
  let fixture: ComponentFixture<TestDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDetailEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
