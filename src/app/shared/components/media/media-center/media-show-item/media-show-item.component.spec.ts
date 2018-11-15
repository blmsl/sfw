import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaShowItemComponent } from './media-show-item.component';

describe('MediaShowItemComponent', () => {
  let component: MediaShowItemComponent;
  let fixture: ComponentFixture<MediaShowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaShowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaShowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
