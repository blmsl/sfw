import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditMainComponent } from './team-edit-main.component';

describe('TeamEditMainComponent', () => {
  let component: TeamEditMainComponent;
  let fixture: ComponentFixture<TeamEditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamEditMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
