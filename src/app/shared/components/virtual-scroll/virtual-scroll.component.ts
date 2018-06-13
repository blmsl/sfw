import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.css']
})

export class VirtualScrollComponent {
  fixedSizeData = Array(10000).fill(30);
}
