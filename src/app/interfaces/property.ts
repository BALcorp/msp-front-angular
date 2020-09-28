import {PropertyState} from './propertyState';
import {Bathroom} from './bathroom';
import {Bedroom} from './bedroom';
import {PropertyType} from './propertyType';


export interface Property {
  idProperty: number;
  size: number;
  maxGuests: number;
  petsAuthorized: boolean;
  note: string;
  dailyRate: number;
  address: string;
  addressComplement: string;
  zipCode: string;
  propertyType: PropertyType;
  // propertyType: string;
  propertyState: PropertyState;
  bathrooms: Bathroom[];
  bedrooms: Bedroom[];

}




