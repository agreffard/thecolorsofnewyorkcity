import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private settingsService: SettingsService, private stripeService: StripeService) {
    this.setEn();
  }

  ngOnInit() {
  }

  lang: string;

  setEn() {
    this.lang = 'en';
  }

  setFr() {
    this.lang = 'fr';
  }

  close() {
    this.stripeService.hideDetail()
    this.settingsService.hideAbout()
  }
}
