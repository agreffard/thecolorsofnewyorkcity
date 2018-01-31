import { Component, OnInit } from '@angular/core';
import { Stripe } from '../stripe';
import { StripeService } from '../stripe.service';
import { SettingsService } from '../settings.service';
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

  constructor(private stripeService: StripeService, private settingsService: SettingsService) { }

  ngOnInit() {
    this.getStripes();
  }

  getStripes(): void {
    this.stripeService.getStripes().subscribe(stripes => this.stripes = stripes);
  }

  getUrl(stripe) {
  	return "assets/images/" + stripe.image;
  }

  getNbLines(): number {
    return this.settingsService.mode === "horizontal"
      ? 1
      : this.settingsService.mode === "vertical"
        ? 550
        : 17;
  }

  getStyle(stripe) {
  	let nbLines = this.getNbLines();
    var style = {
        "background-color": stripe.color,
        "grid-column": Math.ceil((stripe.id + 1) / nbLines),
        "grid-row": (stripe.id) % nbLines + 1
      };
    if ((this.settingsService.mode === "preview" && stripe !== this.previewStripe)
        || this.settingsService.mode !== "preview" && stripe === this.previewStripe) {
    	style["background"] = 'url("'+this.getUrl(stripe)+'")';
        style["background-size"] = 'cover';
        style["background-position"] = 'center';
    } else {
    	style["background-color"] = stripe.color;
    }
    if (this.settingsService.mode === "circles") {
        style["border-radius"]= '50%';
    }
    return style;
  }
}
