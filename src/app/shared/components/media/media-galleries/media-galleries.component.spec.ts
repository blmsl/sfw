import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGalleriesComponent } from './media-galleries.component';

describe('MediaGalleriesComponent', () => {
  let component: MediaGalleriesComponent;
  let fixture: ComponentFixture<MediaGalleriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaGalleriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
