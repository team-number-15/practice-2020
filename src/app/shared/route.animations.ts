import {animate, animateChild, query, sequence, style, transition, trigger} from '@angular/animations';

export const routeChangeAnimation =
  trigger('routeAnimations', [
    transition('HomePage => ResultPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      sequence([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%', transform: 'scale(0) translateY(100%)', opacity: 0}))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%', opacity: 1, transform: 'scale(1) translateY(0)'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

export const fader =
  trigger('routeAnimations', [
    transition('HomePage => ResultPage', [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
        })
      ], {optional: true}),
      query(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        })
      ], {optional: true}),
      sequence([
        query(':leave', [
          animate('900ms ease',
            style({
              opacity: 0,
              transform: 'scale(0) translateY(100%)',
            })
          )
        ], {optional: true}),
        query(':enter', [
          animate('600ms 800ms ease',
            style({
              opacity: 1,
              transform: 'scale(1) translateY(0)'
            })
          ),
        ], {optional: true})
      ]),
    ])
  ]);
