import { Component, OnInit, Input } from '@angular/core';
import { Stripe } from '../stripe';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-stripe-detail',
  templateUrl: './stripe-detail.component.html',
  styleUrls: ['./stripe-detail.component.css']
})

export class StripeDetailComponent implements OnInit {
  @Input() stripe: Stripe;

  constructor(private stripeService: StripeService) { }

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
