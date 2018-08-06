import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditEventFormComponent } from './match-edit-event-form.component';

describe('MatchEditEventFormComponent', () => {
  let component: MatchEditEventFormComponent;
  let fixture: ComponentFixture<MatchEditEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditEventFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
