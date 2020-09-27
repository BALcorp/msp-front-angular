import {ProductForBookings} from './productForBookings';

export interface Booking {
  bookingDate: Date;
  checkInDate: Date;
  checkOutDate: Date;
  totalToPay: number;
  guestsNumber: number;
  pets: boolean;
  canceled: boolean;
  product: ProductForBookings;
  username: string;

}
