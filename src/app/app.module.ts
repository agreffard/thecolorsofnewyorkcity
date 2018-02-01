import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripesComponent } from './stripes/stripes.component';
import { StripeDetailComponent } from './stripe-detail/stripe-detail.component';
import { StripeService } from './stripe.service';
import { SettingsService } from './settings.service';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    StripesComponent,
    StripeDetailComponent,
    SettingsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [StripeService, SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
