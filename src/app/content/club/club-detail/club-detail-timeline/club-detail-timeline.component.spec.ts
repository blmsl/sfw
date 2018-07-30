import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailTimelineComponent } from './club-detail-timeline.component';

describe('ClubDetailTimelineComponent', () => {
  let component: ClubDetailTimelineComponent;
  let fixture: ComponentFixture<ClubDetailTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailTimelineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
