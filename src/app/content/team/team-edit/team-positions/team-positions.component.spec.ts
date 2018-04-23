import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPositionsComponent } from './team-positions.component';

describe('TeamPositionsComponent', () => {
  let component: TeamPositionsComponent;
  let fixture: ComponentFixture<TeamPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamPositionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
