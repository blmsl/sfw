import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLinksDataComponent } from './sidebar-links-data.component';

describe('SidebarLinksDataComponent', () => {
  let component: SidebarLinksDataComponent;
  let fixture: ComponentFixture<SidebarLinksDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarLinksDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLinksDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
