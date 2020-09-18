import {Property} from './property';
import {ProductPicture} from './productPicture';
import {Evaluation} from './evaluation';

export interface Product {
  idProduct: number;
  title: string;
  description: string;
  property: Property;
  productPictures: ProductPicture[];
  evaluations: Evaluation[];

}
