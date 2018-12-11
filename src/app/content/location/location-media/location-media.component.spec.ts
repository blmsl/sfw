import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMediaComponent } from './location-media.component';

describe('LocationMediaComponent', () => {
  let component: LocationMediaComponent;
  let fixture: ComponentFixture<LocationMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
