import { PaymentComponent } from './payment/payment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [

  { path: 'payment', component: PaymentComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
