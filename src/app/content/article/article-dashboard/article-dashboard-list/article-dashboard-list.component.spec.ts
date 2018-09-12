import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDashboardListComponent } from './article-dashboard-list.component';

describe('ArticleDashboardListComponent', () => {
  let component: ArticleDashboardListComponent;
  let fixture: ComponentFixture<ArticleDashboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
