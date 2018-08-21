import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditArticleFormComponent } from './match-edit-article-form.component';

describe('MatchEditArticleFormComponent', () => {
  let component: MatchEditArticleFormComponent;
  let fixture: ComponentFixture<MatchEditArticleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditArticleFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
