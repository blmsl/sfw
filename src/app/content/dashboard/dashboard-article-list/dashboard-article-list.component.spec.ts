import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardArticleListComponent } from './article-list.component';

describe('ArticleListComponent', () => {
  let component: DashboardArticleListComponent;
  let fixture: ComponentFixture<DashboardArticleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardArticleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardArticleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
