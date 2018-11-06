import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemsListModalComponent } from './media-items-list-modal.component';

describe('MediaItemsListModalComponent', () => {
  let component: MediaItemsListModalComponent;
  let fixture: ComponentFixture<MediaItemsListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemsListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
