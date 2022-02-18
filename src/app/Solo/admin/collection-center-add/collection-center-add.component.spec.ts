import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCenterAddComponent } from './collection-center-add.component';

describe('CollectionCenterAddComponent', () => {
  let component: CollectionCenterAddComponent;
  let fixture: ComponentFixture<CollectionCenterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionCenterAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
