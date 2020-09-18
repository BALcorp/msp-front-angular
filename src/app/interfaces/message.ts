import {MessageCategory} from './messageCategory';
import {User} from './user';

export interface Message {
idMessage: number;
message: string;
messageDate: Date;
messageCategory: MessageCategory;
user: User;
}
