import { Component, OnInit } from '@angular/core';
import { Stripe } from '../stripe';
import { StripeService } from '../stripe.service';
import { STRIPES } from '../mock-stripes';

@Component({
  selector: 'app-stripes',
  templateUrl: './stripes.component.html',
  styleUrls: ['./stripes.component.css']
})
export class StripesComponent implements OnInit {

  stripes = [];

  selectedStripe: Stripe;

  onSelect(stripe: Stripe): void {
    this.selectedStripe = stripe;
  }

  constructor(private stripeService: StripeService) { }

  ngOnInit() {
    this.getStripes();
  }

  getStripes(): void {
    this.stripeService.getStripes().subscribe(stripes => this.stripes = stripes);
  }

  getStyle(stripe) {
  	return {
      "background-color": stripe.color,
      "grid-column": stripe.id + 1,
      "grid-row": '1'
    }
  }
}
