import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMapFilterComponent } from './location-map-filter.component';

describe('LocationMapFilterComponent', () => {
  let component: LocationMapFilterComponent;
  let fixture: ComponentFixture<LocationMapFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMapFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
