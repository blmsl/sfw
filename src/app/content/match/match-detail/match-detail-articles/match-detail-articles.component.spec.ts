import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailArticlesComponent } from './match-detail-articles.component';

describe('MatchDetailArticlesComponent', () => {
  let component: MatchDetailArticlesComponent;
  let fixture: ComponentFixture<MatchDetailArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchDetailArticlesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
