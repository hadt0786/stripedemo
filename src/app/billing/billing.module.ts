import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PaymentComponent } from './payment/payment.component';
import { SignUpComponent } from './sign-up/sign-up.component';

// reactive forms
// services
import { StripeServiceService } from './stripe-service/stripe-service.service';

@NgModule({
  declarations: [PaymentComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StripeServiceService]
})
export class BillingModule { }
