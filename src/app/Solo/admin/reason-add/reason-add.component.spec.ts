import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonAddComponent } from './reason-add.component';

describe('ReasonAddComponent', () => {
  let component: ReasonAddComponent;
  let fixture: ComponentFixture<ReasonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
