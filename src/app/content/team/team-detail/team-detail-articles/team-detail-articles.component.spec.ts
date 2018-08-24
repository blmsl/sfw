import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailArticlesComponent } from './team-detail-articles.component';

describe('TeamDetailArticlesComponent', () => {
  let component: TeamDetailArticlesComponent;
  let fixture: ComponentFixture<TeamDetailArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamDetailArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
