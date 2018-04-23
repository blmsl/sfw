import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailMediaComponent } from './team-detail-media.component';

describe('TeamDetailMediaComponent', () => {
  let component: TeamDetailMediaComponent;
  let fixture: ComponentFixture<TeamDetailMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailMediaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
