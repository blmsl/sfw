import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAvatarComponent } from './media-avatar.component';

describe('MediaAvatarComponent', () => {
  let component: MediaAvatarComponent;
  let fixture: ComponentFixture<MediaAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
