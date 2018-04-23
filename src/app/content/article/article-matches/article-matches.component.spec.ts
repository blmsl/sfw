import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMatchesComponent } from './article-matches.component';

describe('ArticleMatchesComponent', () => {
  let component: ArticleMatchesComponent;
  let fixture: ComponentFixture<ArticleMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleMatchesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
