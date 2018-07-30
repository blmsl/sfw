import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditTeamsComponent } from './member-edit-teams.component';

describe('MemberEditTeamsComponent', () => {
  let component: MemberEditTeamsComponent;
  let fixture: ComponentFixture<MemberEditTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
