import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditMediaComponent } from './team-edit-media.component';

describe('TeamEditMediaComponent', () => {
  let component: TeamEditMediaComponent;
  let fixture: ComponentFixture<TeamEditMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamEditMediaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
