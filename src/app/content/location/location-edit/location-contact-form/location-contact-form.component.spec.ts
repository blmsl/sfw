import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationContactFormComponent } from './location-contact-form.component';

describe('LocationContactFormComponent', () => {
  let component: LocationContactFormComponent;
  let fixture: ComponentFixture<LocationContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationContactFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
