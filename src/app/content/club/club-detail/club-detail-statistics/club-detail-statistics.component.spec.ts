import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailStatisticsComponent } from './club-detail-statistics.component';

describe('ClubDetailStatisticsComponent', () => {
  let component: ClubDetailStatisticsComponent;
  let fixture: ComponentFixture<ClubDetailStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetailStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
