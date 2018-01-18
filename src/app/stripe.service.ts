import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Stripe } from './stripe';
import { STRIPES } from './mock-stripes';

@Injectable()
export class StripeService {

  constructor() { }

  getStripes(): Observable<Stripe[]> {
    return of(STRIPES);
  }

}
