import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPAListAddComponent } from './tpa-list-add.component';

describe('TPAListAddComponent', () => {
  let component: TPAListAddComponent;
  let fixture: ComponentFixture<TPAListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPAListAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TPAListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
