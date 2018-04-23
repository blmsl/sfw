import { trigger, state, query, transition, style, animate, stagger } from '@angular/animations';

// https://stackblitz.com/edit/zen-feedback?embed=1&file=app/app.component.ts&view=preview

export const feedbackAnimation = trigger('feedbackAnimation', [
  transition(':enter', [
    query('.zen-menu', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      animate('.3s 1s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
    ])
  ])
]);

export const appearBottomTopAnimation = trigger('appearBottomTop', [
  state('inactive', style({ opacity: 0, visibility: 'hidden', transform: 'translateY(30px)' })),
  state('active', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('inactive <=> active', animate('.3s .5s ease-in-out'))
]);

export const appearRightLeftAnimation = trigger('appearRightLeft', [
  state('inactive', style({ opacity: 0, visibility: 'hidden', transform: 'translateX(30px)' })),
  state('active', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('inactive <=> active', animate('.3s .5s ease-in-out'))
]);

export const changeSuccessBackgroundColorAnimation = trigger('changeSuccessBackgroundColor', [
  state('success', style({ backgroundColor: 'green' })),
  state('false', style({})),
  transition('* => success', animate('.3s ease-in'))
]);
