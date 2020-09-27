import {Property} from './property';
import {Evaluation} from './evaluation';
import {Booking} from './booking';

export interface Product {
  idProduct: number;
  title: string;
  description: string;
  property: Property;
  bookings: Booking[];
  evaluations: Evaluation[];

}
