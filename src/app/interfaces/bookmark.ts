import {User} from './user';

export interface Bookmark {
  idBookmark: number;
  addDate: Date;
  idProduct: number;
  user: User;
}
