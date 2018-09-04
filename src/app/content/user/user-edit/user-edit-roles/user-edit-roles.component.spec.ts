import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditRolesComponent } from './user-edit-roles.component';

describe('UserEditRolesComponent', () => {
  let component: UserEditRolesComponent;
  let fixture: ComponentFixture<UserEditRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditRolesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
