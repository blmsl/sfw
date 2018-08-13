import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditArticlesComponent } from './match-edit-articles.component';

describe('MatchEditArticlesComponent', () => {
  let component: MatchEditArticlesComponent;
  let fixture: ComponentFixture<MatchEditArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditArticlesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
