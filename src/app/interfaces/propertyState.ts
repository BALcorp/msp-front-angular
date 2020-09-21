import {PropertyStateAmenity} from './propertyStateAmenity';
import {PropertyStateItem} from './propertyStateItem';

export interface PropertyState {
  idPropertyState: number;
  propertyStateAmenities: PropertyStateAmenity[];
  propertyStateItems: PropertyStateItem[];

}
