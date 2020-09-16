import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProductComponent} from './product/product.component';
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'products-catalog', component: ProductsCatalogComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'contact-us', component: ContactUsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
