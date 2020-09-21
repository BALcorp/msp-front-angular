import {Booking} from './booking';
import {Evaluation} from './evaluation';

export interface BookingWithEvaluationDetails {
  booking: Booking;
  evaluation: Evaluation;
  isEvaluationUpdated: string;
}
