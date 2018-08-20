import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetailArticleComponent } from './location-detail-article.component';

describe('LocationDetailArticleComponent', () => {
  let component: LocationDetailArticleComponent;
  let fixture: ComponentFixture<LocationDetailArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDetailArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
