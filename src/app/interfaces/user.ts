import {Role} from './role';
import {Bookmark} from './bookmark';

export interface User {
  idUser: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
  telephone: string;
  role: Role;
  bookmarkList: Bookmark[];

}
