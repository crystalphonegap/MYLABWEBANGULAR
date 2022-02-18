import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelGroupListComponent } from './label-group-list.component';

describe('LabelGroupListComponent', () => {
  let component: LabelGroupListComponent;
  let fixture: ComponentFixture<LabelGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
