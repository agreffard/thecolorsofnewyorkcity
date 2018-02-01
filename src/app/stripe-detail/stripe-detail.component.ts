import { Component, OnInit, Input } from '@angular/core';
import { Stripe } from '../stripe';
import { trigger, state, transition, style, animate } from '@angular/animations'

@Component({
  selector: 'app-stripe-detail',
  templateUrl: './stripe-detail.component.html',
  styleUrls: ['./stripe-detail.component.css']
  animations: [
    trigger('visibilityChanged', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('* => *', animate('500ms'))
  ]
})

export class StripeDetailComponent implements OnInit {
  @Input() stripe: Stripe;

  constructor() { }

  ngOnInit() {
  }

  getUrl(stripe) {
  	return "assets/images/" + stripe.image;
  }

  getPreviewColorStyle(stripe) {
  let size = '50px';
  	return {
  	  "background-color": stripe.color,
  	  "width": size,
  	  "height": size,
  	  "border-radius": '50%'
    };
  }

}
