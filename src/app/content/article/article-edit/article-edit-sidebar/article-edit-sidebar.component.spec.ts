import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditSidebarComponent } from './article-edit-sidebar.component';

describe('ArticleEditSidebarComponent', () => {
  let component: ArticleEditSidebarComponent;
  let fixture: ComponentFixture<ArticleEditSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleEditSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
