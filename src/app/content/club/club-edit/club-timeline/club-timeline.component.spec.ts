import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubTimelineComponent } from './club-timeline.component';

describe('ClubTimelineComponent', () => {
  let component: ClubTimelineComponent;
  let fixture: ComponentFixture<ClubTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubTimelineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
