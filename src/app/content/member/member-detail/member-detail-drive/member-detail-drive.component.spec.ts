import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailDriveComponent } from './member-detail-drive.component';

describe('MemberDetailDriveComponent', () => {
  let component: MemberDetailDriveComponent;
  let fixture: ComponentFixture<MemberDetailDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailDriveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
