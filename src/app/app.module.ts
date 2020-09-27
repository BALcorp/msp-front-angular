import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProductsCatalogComponent} from './products-catalog/products-catalog.component';
import {RegistrationComponent} from './registration/registration.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {ProductComponent} from './product/product.component';
import {MyPersoAccountClientComponent} from './my-perso-account-client/my-perso-account-client.component';
import {MyBookingsClientComponent} from './my-bookings-client/my-bookings-client.component';
import {PaymentComponent} from './payment/payment.component';
import {ProductBackOfficeComponent} from './product-back-office/product-back-office.component';
import {SimpleSearchComponent} from './simple-search/simple-search.component';
import {MulticriteriaSearchComponent} from './multicriteria-search/multicriteria-search.component';
import {LoginComponent} from './login/login.component';
import {AuthorizationService} from './services/authorization.service';
import {LowerbarComponent} from './lowerbar/lowerbar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FilterPipe} from './filter.pipe';
import {SearchComponent} from './search/search.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductsearchComponent} from './productsearch/productsearch.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    WelcomeComponent,
    ProductsCatalogComponent,
    LoginComponent,
    RegistrationComponent,
    ContactUsComponent,
    ProductComponent,
    MyPersoAccountClientComponent,
    MyBookingsClientComponent,
    PaymentComponent,
    ProductBackOfficeComponent,
    SimpleSearchComponent,
    MulticriteriaSearchComponent,
    LowerbarComponent,
    FilterPipe,
    SearchComponent,
    ProductListComponent,
    ProductsearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
