import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubHonoraryListComponent } from './club-honorary-list.component';

describe('ClubHonoraryListComponent', () => {
  let component: ClubHonoraryListComponent;
  let fixture: ComponentFixture<ClubHonoraryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubHonoraryListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubHonoraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
