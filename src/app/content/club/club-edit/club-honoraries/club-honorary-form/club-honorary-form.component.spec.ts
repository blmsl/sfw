import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubHonoraryFormComponent } from './club-honorary-form.component';

describe('ClubHonoraryFormComponent', () => {
  let component: ClubHonoraryFormComponent;
  let fixture: ComponentFixture<ClubHonoraryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubHonoraryFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubHonoraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
