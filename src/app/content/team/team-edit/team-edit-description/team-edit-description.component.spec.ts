import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditDescriptionComponent } from './team-edit-description.component';

describe('TeamEditDescriptionComponent', () => {
  let component: TeamEditDescriptionComponent;
  let fixture: ComponentFixture<TeamEditDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEditDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
