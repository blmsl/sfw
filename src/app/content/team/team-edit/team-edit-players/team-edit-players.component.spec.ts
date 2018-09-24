import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditPlayersComponent } from './team-edit-players.component';

describe('TeamEditPlayersComponent', () => {
  let component: TeamEditPlayersComponent;
  let fixture: ComponentFixture<TeamEditPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamEditPlayersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
