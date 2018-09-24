import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditCreationComponent } from './team-edit-creation.component';

describe('TeamEditCreationComponent', () => {
  let component: TeamEditCreationComponent;
  let fixture: ComponentFixture<TeamEditCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamEditCreationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
