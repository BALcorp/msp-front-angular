import {Component, OnInit} from '@angular/core';
import {Booking} from '../interfaces/booking';
import {User} from '../interfaces/user';
import {Product} from '../interfaces/product';
import {BookingService} from '../services/booking.service';
import {ProductService} from '../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  booking: Booking;

  user: User;

  totalToPay: string;

  bookedProduct: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private bookingService: BookingService) {}

  ngOnInit(): void {

    const idProduct = +this.route.snapshot.paramMap.get('idProduct');
    const checkInDate = '555';
    const checkOutDate = '555';
    const guestsNumber = 5;
    this.booking = {
      bookingDate: new Date(Date.now()),
      canceled: false,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      guestsNumber,
      idBooking: null,
      idClient: 1,
      idProduct,
      pets: false,
      totalToPay: new Date(checkOutDate).valueOf() - new Date(checkInDate).valueOf()
    };

    // this.state$ = this.route.paramMap
    //   .pipe(map(() => window.history.state));
    // FacesContext fc = FacesContext.getCurrentInstance();
    // HttpSession session = (HttpSession) fc.getExternalContext().getSession(false);
    // booking = (BookingDto) session.getAttribute("selectedBooking");
    // user = (UserDto) session.getAttribute("connectedUser");

    // this.booking.setIdClient(user.getIdUser());
    // if (this.booking !== undefined) {
    //   this.productService.findProduct(this.booking.idProduct).subscribe({
    //     next: product => this.bookedProduct = product, error: error => 'yo'
    //   });
    //
    //   if (this.bookedProduct.property.petsAuthorized === true) {
    //     this.petsAuthorized = 'Les animaux sont autorisés';
    //   } else {
    //     this.petsAuthorized = 'Les animaux ne sont pas autorisés';
    //   }
      // DateTimeFormatter
      // formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
      // ZoneId
      // zoneId = ZoneId.of("UTC+2");
      // bookingDate = booking.getBookingDate().atZone(zoneId).format(formatter).toString();
      // checkInDate = booking.getCheckInDate().format(formatter).toString();
      // checkOutDate = booking.getCheckOutDate().format(formatter).toString();
      //
      // Long
      // days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
      // booking.setTotalToPay(bookedProduct.getProperty().getDailyrate() * days);
      // totalToPay = booking.getTotalToPay().toString().split("\\.")[0];
    // }
  }

  book(): string {
    this.bookingService.createBooking(this.booking);
    return '/welcome';
  }
}
