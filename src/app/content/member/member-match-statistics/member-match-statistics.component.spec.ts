import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMatchStatisticsComponent } from './member-match-statistics.component';

describe('MemberMatchStatisticsComponent', () => {
  let component: MemberMatchStatisticsComponent;
  let fixture: ComponentFixture<MemberMatchStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberMatchStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMatchStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
