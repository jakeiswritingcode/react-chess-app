import { BaseUpdate } from '../BaseUpdate'

export interface ChatUpdate extends BaseUpdate {
    type: 'chat';
    message: string;
}
