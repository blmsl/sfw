import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPositionFormComponent } from './team-position-form.component';

describe('TeamPositionFormComponent', () => {
  let component: TeamPositionFormComponent;
  let fixture: ComponentFixture<TeamPositionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamPositionFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
