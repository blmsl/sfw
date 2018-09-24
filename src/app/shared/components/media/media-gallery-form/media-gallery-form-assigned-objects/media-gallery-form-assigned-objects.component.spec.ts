import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGalleryFormAssignedObjectsComponent } from './media-gallery-form-assigned-objects.component';

describe('MediaGalleryFormAssignedObjectsComponent', () => {
  let component: MediaGalleryFormAssignedObjectsComponent;
  let fixture: ComponentFixture<MediaGalleryFormAssignedObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaGalleryFormAssignedObjectsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaGalleryFormAssignedObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
