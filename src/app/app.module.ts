import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StripesComponent } from './stripes/stripes.component';
import { StripeDetailComponent } from './stripe-detail/stripe-detail.component';
import { StripeService } from './stripe.service';

@NgModule({
  declarations: [
    AppComponent,
    StripesComponent,
    StripeDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StripeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
