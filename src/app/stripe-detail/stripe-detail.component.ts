import { Component, OnInit, Input } from '@angular/core';
import { Stripe } from '../stripe';

@Component({
  selector: 'app-stripe-detail',
  templateUrl: './stripe-detail.component.html',
  styleUrls: ['./stripe-detail.component.css']
})

export class StripeDetailComponent implements OnInit {
  @Input() stripe: Stripe;

  constructor() { }

  ngOnInit() {
  }

}
