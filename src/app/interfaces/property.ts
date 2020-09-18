import {PropertyState} from './propertyState';
import {Bathroom} from './bathroom';
import {Bedroom} from './bedroom';



export interface Property {
  idProperty: number;
  size: number;
  maxGuests: number;
  petsAuthorized: boolean;
  note: string;
  dailyrate: number;
  address: string;
  addressComplement: string;
  zipCode: string;
  propertyType: string;
  propertyState: PropertyState;
  bathrooms: Bathroom[];
  bedrooms: Bedroom[];

}




