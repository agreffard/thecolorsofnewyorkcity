import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeDetailComponent } from './stripe-detail.component';

describe('StripeDetailComponent', () => {
  let component: StripeDetailComponent;
  let fixture: ComponentFixture<StripeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
