import { Component, OnInit } from '@angular/core';
import { Stripe } from '../stripe';
import { StripeService } from '../stripe.service';
import { SettingsService } from '../settings.service';
import { STRIPES } from '../mock-stripes';
import { trigger, state, transition, style, animate } from '@angular/animations'	

@Component({
  selector: 'app-stripes',
  templateUrl: './stripes.component.html',
  styleUrls: ['./stripes.component.css'],
  animations: [
    trigger('stripeDetailsVisibility', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false => true', animate('300ms')),
      transition('true => false', animate('500ms'))
    ])
  ]
})
export class StripesComponent implements OnInit {

  stripes = [];

  selectedStripe: Stripe;
  previousSelectedStripe: Stripe;
  previewStripe: Stripe;
  selectionShown: boolean;
  selectionShownDate: number;

  onMouseOver(stripe: Stripe): void {
    if (this.settingsService.mode === 'horizontal' || this.settingsService.mode === 'vertical') {
      this.selectStripe(stripe);
  	} else {
      this.showPreview(stripe);
  	}
  }

  onMouseOut(): void {
    this.hidePreview()
    this.settingsService.show();
  }

  onMouseClick(stripe: Stripe): void {
    this.selectStripe(stripe);
  }

  selectStripe(stripe: Stripe): void {
    // avoid showing the same image indefinitely if we hide the image and stay on the same stripe
    if ((this.settingsService.mode === 'vertical' || this.settingsService.mode === 'horizontal') && this.previousSelectedStripe === stripe) {
      return;
    }
    this.selectedStripe = stripe;
    this.previousSelectedStripe = stripe;
    this.selectionShown = true;
    this.selectionShownDate = new Date().getTime();
    var timeout = 10000;
    setTimeout(function() {
      if (new Date().getTime() - this.selectionShownDate >= timeout) {
        this.selectionShown = false;
      }
    }.bind(this), timeout);
  }

  showPreview(stripe: Stripe): void {
    this.previewStripe = stripe;
  }

  hidePreview(): void {
    this.previewStripe = null;
  }

  stripeDetailAnimationDone() {
  	if (!this.selectionShown) {
      this.selectedStripe = null
  	}
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

  getThumbnailUrl(stripe) {
    return "assets/thumbnails/" + stripe.image;
  }

  getNbLines(): number {
    return this.settingsService.mode === "horizontal"
      ? 1
      : this.settingsService.mode === "vertical"
        ? 550
        : window.innerHeight && window.innerWidth
          ? Math.floor(Math.sqrt(550 * window.innerHeight / window.innerWidth))
          : 17;
  }

  getStyle(stripe) {
  	let nbLines = this.getNbLines();
    var style = {
        "grid-column": Math.ceil((stripe.id + 1) / nbLines),
        "grid-row": (stripe.id) % nbLines + 1
      };
    if ((this.settingsService.mode === "preview" && stripe !== this.previewStripe)
        || (this.settingsService.mode !== "preview"
          && this.settingsService.mode !== "horizontal"
          && this.settingsService.mode !== "vertical"
          && stripe === this.previewStripe)) {
    	style["background"] = 'url("'+this.getThumbnailUrl(stripe)+'")';
        style["background-size"] = 'cover';
        style["background-position"] = 'center';
    } else {
    	style["background-color"] = stripe.color;
    }
    if (this.settingsService.mode === "circles") {
        style["border-radius"]= '50%';
        style["margin"]= '8%';
    }
    return style;
  }
}
