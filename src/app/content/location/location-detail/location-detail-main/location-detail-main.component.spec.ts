import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailMainComponent } from './location-detail-main.component';

describe('LocationDetailMainComponent', () => {
  let component: LocationDetailMainComponent;
  let fixture: ComponentFixture<LocationDetailMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationDetailMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
