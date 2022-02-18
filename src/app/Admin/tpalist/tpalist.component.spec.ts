import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPAListComponent } from './tpalist.component';

describe('TPAListComponent', () => {
  let component: TPAListComponent;
  let fixture: ComponentFixture<TPAListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPAListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TPAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
