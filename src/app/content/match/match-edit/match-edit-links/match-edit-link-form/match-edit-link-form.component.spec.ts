import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEditLinkFormComponent } from './match-edit-link-form.component';

describe('MatchEditLinkFormComponent', () => {
  let component: MatchEditLinkFormComponent;
  let fixture: ComponentFixture<MatchEditLinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchEditLinkFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEditLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
