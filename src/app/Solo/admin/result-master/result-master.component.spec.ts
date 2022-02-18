import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultMasterComponent } from './result-master.component';

describe('ResultMasterComponent', () => {
  let component: ResultMasterComponent;
  let fixture: ComponentFixture<ResultMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
