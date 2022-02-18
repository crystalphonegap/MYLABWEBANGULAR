import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLableGroupsComponent } from './add-lable-groups.component';

describe('AddLableGroupsComponent', () => {
  let component: AddLableGroupsComponent;
  let fixture: ComponentFixture<AddLableGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLableGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLableGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
