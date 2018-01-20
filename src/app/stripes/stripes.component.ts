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
  previewStripe: Stripe;

  onSelect(stripe: Stripe): void {
    this.selectedStripe = stripe;
  }

  showPreview(stripe: Stripe): void {
    this.previewStripe = stripe;
  }

  hidePreview(): void {
    this.previewStripe = null;
  }

  constructor(private stripeService: StripeService) { }

  ngOnInit() {
    this.getStripes();
  }

  getStripes(): void {
    this.stripeService.getStripes().subscribe(stripes => this.stripes = stripes);
  }

  getUrl(stripe) {
  	return "assets/images/" + stripe.image;
  }

  getStyle(stripe, nbLines) {
    
    if (stripe === this.previewStripe) {
    	return {
        "background": 'url("'+this.getUrl(stripe)+'")',
        "background-size": 'cover',
        "background-position": 'center',
        "grid-column": (stripe.id + 1) / nbLines,
        "grid-row": (stripe.id + 1) % nbLines
      }
    } else {
      return {
        "background-color": stripe.color,
        "grid-column": (stripe.id + 1) / nbLines,
        "grid-row": (stripe.id + 1) % nbLines
      }
    }
    
  }

}
