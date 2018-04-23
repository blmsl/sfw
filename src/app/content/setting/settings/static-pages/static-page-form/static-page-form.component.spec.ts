import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageFormComponent } from './static-page-form.component';

describe('StaticPageFormComponent', () => {
  let component: StaticPageFormComponent;
  let fixture: ComponentFixture<StaticPageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaticPageFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
