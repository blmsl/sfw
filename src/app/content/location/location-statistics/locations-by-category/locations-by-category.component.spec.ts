import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsByCategoryComponent } from './locations-by-category.component';

describe('LocationsByCategoryComponent', () => {
  let component: LocationsByCategoryComponent;
  let fixture: ComponentFixture<LocationsByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsByCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
