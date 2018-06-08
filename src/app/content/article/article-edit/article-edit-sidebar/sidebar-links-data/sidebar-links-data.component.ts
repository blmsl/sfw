import {
  Component,
  Input,
  OnInit
}                    from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sidebar-links-data',
  templateUrl: './sidebar-links-data.component.html',
  styleUrls: ['./sidebar-links-data.component.scss']
})
export class SidebarLinksDataComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
