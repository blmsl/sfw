import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubManagementPhotoComponent } from './club-management-photo.component';

describe('ClubManagementPhotoComponent', () => {
  let component: ClubManagementPhotoComponent;
  let fixture: ComponentFixture<ClubManagementPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubManagementPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubManagementPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
