import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const fadeOutAnimation = trigger('visibilityChanged', [
  state('false' , style({ opacity: 1, transform: 'scale(1.0)' })),
  state('true', style({ opacity: 0, transform: 'scale(0.0)'  })),
  transition('1 => 0', animate('300ms')),
  transition('0 => 1', animate('900ms'))
]);
