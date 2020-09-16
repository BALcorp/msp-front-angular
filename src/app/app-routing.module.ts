import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProductComponent} from './product/product.component';
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {RegistrationComponent} from './registration/registration.component';
import {MyBookingsClientComponent} from './my-bookings-client/my-bookings-client.component';
import {MyPersoAccountClientComponent} from './my-perso-account-client/my-perso-account-client.component';
import {PaymentComponent} from './payment/payment.component';
import {ProductBackOfficeComponent} from './product-back-office/product-back-office.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products-catalog', component: ProductsCatalogComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'my-bookings-client', component: MyBookingsClientComponent},
  { path: 'my-perso-account-client', component: MyPersoAccountClientComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'product-back-office', component: ProductBackOfficeComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
