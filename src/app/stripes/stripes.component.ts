import { Component, OnInit, HostListener } from '@angular/core';
import { Stripe } from '../stripe';
import { StripeService } from '../stripe.service';
import { SettingsService } from '../settings.service';
import { STRIPES } from '../mock-stripes';
import { trigger, state, transition, style, animate } from '@angular/animations';

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

  @HostListener('document:keydown', ['$event'])

  onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) { // escape
      if (this.selectionShown) {
        this.hideSelection();
      }
      this.settingsService.hideAbout();
    }
  }

  stripes = [];

  selectedStripe: Stripe;
  previousSelectedStripe: Stripe;
  previewStripe: Stripe;
  selectionShown: boolean;
  selectionShownDate: number;

  onMouseOver(stripe: Stripe): void {
    if (this.settingsService.mode === 'horizontal' || this.settingsService.mode === 'vertical') {
      if (!this.settingsService.aboutVisible) {
        this.selectStripe(stripe, false);
      }
  	} else {
      this.showPreview(stripe);
  	}
  }

  onMouseOut(): void {
    this.hidePreview()
    this.settingsService.show();
  }

  onMouseClick(stripe: Stripe): void {
    this.selectStripe(stripe, true);
  }

  selectRandomStripe() {
    var id = Math.floor(Math.random() * 549);
    var stripe = this.stripeService.getStripe(id)
    this.selectStripe(stripe, true);
  }

  selectStripe(stripe: Stripe, force: boolean): void {
    // avoid showing the same image indefinitely if we hide the image and stay on the same stripe (force showing image on click)
    if (!force && (this.settingsService.mode === 'vertical' || this.settingsService.mode === 'horizontal') && this.previousSelectedStripe === stripe) {
      return;
    }
    this.settingsService.hideAbout()
    this.stripeService.showDetail()
    this.selectedStripe = stripe;
    this.previousSelectedStripe = stripe;
    this.selectionShown = true;
    this.selectionShownDate = new Date().getTime();
    var timeout = 10000;//(this.settingsService.mode === 'vertical' || this.settingsService.mode === 'horizontal') ? 3000 : 10000;
    setTimeout(function() {
      if (new Date().getTime() - this.selectionShownDate >= timeout) {
        this.selectionShown = false;
      }
    }.bind(this), timeout);
  }

  hideSelection() {
    this.selectionShown = false;
    this.settingsService.hideAbout();
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

  clickOnMainContainer(event) {
    if (event.target === event.currentTarget) {
      this.settingsService.hideAbout()
      this.selectedStripe = null;
    }
    this.settingsService.show();
  }

  getStyle(stripe) {
    let nbLines = this.getNbLines();
    let gridColumn = Math.ceil((stripe.id + 1) / nbLines)
    let gridLine = (stripe.id) % nbLines + 1;
    let style = {
        "grid-column": gridColumn,
        "grid-row": gridLine,
        "cursor": 'pointer'
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
