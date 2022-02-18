import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelGroupComponent } from './add-label-group.component';

describe('AddLabelGroupComponent', () => {
  let component: AddLabelGroupComponent;
  let fixture: ComponentFixture<AddLabelGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabelGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
