import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAuthorsStatsComponent } from './article-authors-stats.component';

describe('ArticleAuthorsStatsComponent', () => {
  let component: ArticleAuthorsStatsComponent;
  let fixture: ComponentFixture<ArticleAuthorsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleAuthorsStatsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAuthorsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
