import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMetaDataComponent } from './sidebar-meta-data.component';

describe('SidebarMetaDataComponent', () => {
  let component: SidebarMetaDataComponent;
  let fixture: ComponentFixture<SidebarMetaDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarMetaDataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
