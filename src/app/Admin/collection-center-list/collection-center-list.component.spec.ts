import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCenterListComponent } from './collection-center-list.component';

describe('CollectionCenterListComponent', () => {
  let component: CollectionCenterListComponent;
  let fixture: ComponentFixture<CollectionCenterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionCenterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
