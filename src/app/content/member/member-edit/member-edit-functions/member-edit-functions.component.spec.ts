import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditFunctionsComponent } from './member-edit-functions.component';

describe('MemberEditTeamsComponent', () => {
  let component: MemberEditFunctionsComponent;
  let fixture: ComponentFixture<MemberEditFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
