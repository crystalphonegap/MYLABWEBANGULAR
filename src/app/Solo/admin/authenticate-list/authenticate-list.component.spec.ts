import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateListComponent } from './authenticate-list.component';

describe('AuthenticateListComponent', () => {
  let component: AuthenticateListComponent;
  let fixture: ComponentFixture<AuthenticateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
