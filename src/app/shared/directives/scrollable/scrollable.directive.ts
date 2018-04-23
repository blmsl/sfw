import { Directive, HostListener, EventEmitter, Output, ElementRef, Input } from '@angular/core';

export type ScrollEvent = {
  isReachingBottom: boolean,
  isReachingTop: boolean,
  originalEvent: Event,
  isWindowEvent: boolean
};

@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @Input() public bottomOffset: number = 100;
  @Input() public topOffset: number = 100;
  @Output() public onScroll = new EventEmitter<ScrollEvent>();

  constructor() { }

  // handle host scroll
  @HostListener('scroll', ['$event']) public scrolled($event: Event) {
    this.elementScrollEvent($event);
  }

  // handle window scroll
  @HostListener('window:scroll', ['$event']) public windowScrolled($event: Event) {
    this.windowScrollEvent($event);
  }

  protected windowScrollEvent($event: Event) {
    const target = <Document>$event.target;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const isReachingTop = scrollTop < this.topOffset;
    const isReachingBottom = (target.body.offsetHeight - (window.innerHeight + scrollTop)) < this.bottomOffset;
    const emitValue: ScrollEvent = { isReachingBottom, isReachingTop, originalEvent: $event, isWindowEvent: true };
    this.onScroll.emit(emitValue);
  }

  protected elementScrollEvent($event: Event) {
    const target = <HTMLElement>$event.target;
    const scrollPosition = target.scrollHeight - target.scrollTop;
    const offsetHeight = target.offsetHeight;
    const isReachingTop = target.scrollTop < this.topOffset;
    const isReachingBottom = (scrollPosition - offsetHeight) < this.bottomOffset;
    const emitValue: ScrollEvent = { isReachingBottom, isReachingTop, originalEvent: $event, isWindowEvent: false };
    this.onScroll.emit(emitValue);
  }

}
