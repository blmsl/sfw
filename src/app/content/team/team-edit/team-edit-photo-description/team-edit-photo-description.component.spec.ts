import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamEditPhotoDescriptionComponent } from './team-edit-photo-description.component';

describe('TeamEditPhotoDescriptionComponent', () => {
  let component: TeamEditPhotoDescriptionComponent;
  let fixture: ComponentFixture<TeamEditPhotoDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamEditPhotoDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamEditPhotoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
