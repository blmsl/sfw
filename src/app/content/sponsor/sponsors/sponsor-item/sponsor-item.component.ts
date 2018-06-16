import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ISponsor } from '../../../../shared/interfaces/sponsor.interface';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'sponsor-item',
  templateUrl: './sponsor-item.component.html',
  styleUrls: ['./sponsor-item.component.scss']
})
export class SponsorItemComponent implements OnInit {

  @Input() sponsor: ISponsor;
  @Output() removeSponsor: EventEmitter<ISponsor> = new EventEmitter(false);

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
  public mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  public config: PerfectScrollbarConfigInterface = {};
  public currentImage: string;

  constructor(private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    /* if (!this.currentImage) {
      this.mediaItemService
        .getCurrentImage('sponsor', this.sponsor.id, this.sponsor.id)
        .subscribe((imageUrl: string) => this.currentImage = imageUrl);
    } */
  }

}
