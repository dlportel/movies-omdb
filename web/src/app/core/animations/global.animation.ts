import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const globalAnimation = [
  trigger('enterOpacity', [
    transition(':enter', [
      // style base
      query(':self', style({opacity: 0})),
      // animate
      query(':self', animate(500, style({opacity: 1}))),
    ]),
    transition(':leave', [
      // style base
      query(':self', style({opacity: 1})),
      // animate
      query(':self', animate(0, style({opacity: 0}))),
    ])
  ]),

  trigger('enterMove', [
    transition(':enter', [
      style({width: 10, transform: 'translateX(50px)', opacity: 0}),
      group([
        animate('0.3s 0.1s ease', style({

          transform: 'translateX(0)',
          width: 120
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ]),
  ])
];
