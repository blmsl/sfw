import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IApplication } from '../../../../../shared/interfaces/application.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sidebar-meta-data',
  templateUrl: './sidebar-meta-data.component.html',
  styleUrls: ['./sidebar-meta-data.component.scss']
})
export class SidebarMetaDataComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  public step: number = 0;

  setStep(index: number) {
    this.step = index;
  }

}
