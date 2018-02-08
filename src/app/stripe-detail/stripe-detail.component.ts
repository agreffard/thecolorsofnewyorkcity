import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stripe } from '../stripe';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-stripe-detail',
  templateUrl: './stripe-detail.component.html',
  styleUrls: ['./stripe-detail.component.css']
})

export class StripeDetailComponent implements OnInit {
  @Input() stripe: Stripe;
  @Output() goToStripe = new EventEmitter<object>();

  constructor(private stripeService: StripeService) { }

  ngOnInit() {
  }

  getUrl(stripe) {
    return "assets/images/" + stripe.image;
  }

  getCircleColorStyle(stripe) {
    let size = '7vh';
    return {
      "background-color": stripe.color,
      "width": size,
      "height": size,
      "border-radius": '50%',
      "margin": '0 1vw'
    };
  }

  setStripe(id) {
    this.goToStripe.emit(this.stripeService.getStripe(id));
  }

  next() {
    this.setStripe(this.stripe.id + 1);
  }

  previous() {
    this.setStripe(this.stripe.id - 1);
  }

  isVertical() {
    return window.innerHeight > window.innerWidth;
  }
}

