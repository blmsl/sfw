import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditDriveComponent } from './member-edit-drive.component';

describe('MemberEditDriveComponent', () => {
  let component: MemberEditDriveComponent;
  let fixture: ComponentFixture<MemberEditDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberEditDriveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
