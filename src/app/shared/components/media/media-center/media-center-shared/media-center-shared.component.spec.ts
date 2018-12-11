import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCenterSharedComponent } from './media-center-shared.component';

describe('MediaCenterSharedComponent', () => {
  let component: MediaCenterSharedComponent;
  let fixture: ComponentFixture<MediaCenterSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaCenterSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCenterSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
