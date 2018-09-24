import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditPhotoComponent } from './team-edit-photo.component';

describe('TeamEditPhotoComponent', () => {
  let component: TeamEditPhotoComponent;
  let fixture: ComponentFixture<TeamEditPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamEditPhotoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
