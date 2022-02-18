import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathologyTestAddComponent } from './pathology-test-add.component';

describe('PathologyTestAddComponent', () => {
  let component: PathologyTestAddComponent;
  let fixture: ComponentFixture<PathologyTestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathologyTestAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathologyTestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
