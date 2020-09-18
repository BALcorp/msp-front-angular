import {PropertyStateAmenity} from './propertyStateAmenity';
import {PropertyStateItem} from './propertyStateItem';

export interface PropertyState {
  idPropertyState: number;
  stateDate: Date;
  propertyStateAmenities: PropertyStateAmenity[];
  propertyStateItems: PropertyStateItem[];

}
