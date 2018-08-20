import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailMatchesComponent } from './location-detail-matches.component';

describe('LocationDetailMatchesComponent', () => {
  let component: LocationDetailMatchesComponent;
  let fixture: ComponentFixture<LocationDetailMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDetailMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
