import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectTestComponent } from './redirect-test.component';

describe('RedirectTestComponent', () => {
  let component: RedirectTestComponent;
  let fixture: ComponentFixture<RedirectTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
