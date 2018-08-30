import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditMainComponent } from './user-edit-main.component';

describe('UserEditMainComponent', () => {
  let component: UserEditMainComponent;
  let fixture: ComponentFixture<UserEditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
