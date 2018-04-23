import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploadFormComponent } from './media-upload-form.component';

describe('MediaUploadFormComponent', () => {
  let component: MediaUploadFormComponent;
  let fixture: ComponentFixture<MediaUploadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaUploadFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
