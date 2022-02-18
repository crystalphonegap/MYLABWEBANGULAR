import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTestAddComponent } from './single-test-add.component';

describe('SingleTestAddComponent', () => {
  let component: SingleTestAddComponent;
  let fixture: ComponentFixture<SingleTestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
