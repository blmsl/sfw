import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberStatisticsComponent } from './member-statistics.component';

describe('MemberStatisticsComponent', () => {
  let component: MemberStatisticsComponent;
  let fixture: ComponentFixture<MemberStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberStatisticsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
