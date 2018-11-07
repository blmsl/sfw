import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGalleryListItemsComponent } from './media-gallery-list-items.component';

describe('MediaGalleryListItemsComponent', () => {
  let component: MediaGalleryListItemsComponent;
  let fixture: ComponentFixture<MediaGalleryListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaGalleryListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaGalleryListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
