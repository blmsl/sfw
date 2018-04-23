import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailMainComponent } from './team-detail-main.component';

describe('TeamDetailMainComponent', () => {
  let component: TeamDetailMainComponent;
  let fixture: ComponentFixture<TeamDetailMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamDetailMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
