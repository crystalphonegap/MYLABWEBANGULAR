import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndMobileNumberComponent } from './dnd-mobile-number.component';

describe('DndMobileNumberComponent', () => {
  let component: DndMobileNumberComponent;
  let fixture: ComponentFixture<DndMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DndMobileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DndMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
