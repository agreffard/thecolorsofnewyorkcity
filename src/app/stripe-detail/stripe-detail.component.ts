import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
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

  constructor(public stripeService: StripeService) { }

  @HostListener('document:keydown', ['$event'])

  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 37) { // left
      this.previous()
    }
    if (event.keyCode === 39) { // right
      this.next()
    }
  }

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
    if (this.stripe.id < 549) {
      this.setStripe(this.stripe.id + 1);
    }
  }

  previous() {
    if (this.stripe.id > 0) {
      this.setStripe(this.stripe.id - 1);
    }
  }

  isVertical() {
    return window.innerHeight > window.innerWidth;
  }
}

