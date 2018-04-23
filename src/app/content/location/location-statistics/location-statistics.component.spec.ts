import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationStatisticsComponent } from './location-statistics.component';

describe('LocationStatisticsComponent', () => {
  let component: LocationStatisticsComponent;
  let fixture: ComponentFixture<LocationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
