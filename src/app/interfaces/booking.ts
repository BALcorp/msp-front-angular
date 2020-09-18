export interface Booking {
  idBooking: number;
  bookingDate: Date;
  checkInDate: Date;
  checkOutDate: Date;
  totalToPay: number;
  guestsNumber: number;
  pets: boolean;
  canceled: boolean;
  idProduct: number;
  idClient: number;

}
