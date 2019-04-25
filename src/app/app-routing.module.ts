import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingRoutingModule } from './billing/billing.routing';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), BillingRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
