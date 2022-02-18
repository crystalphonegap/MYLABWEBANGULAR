import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrationAddComponent } from './narration-add.component';

describe('NarrationAddComponent', () => {
  let component: NarrationAddComponent;
  let fixture: ComponentFixture<NarrationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarrationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarrationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
