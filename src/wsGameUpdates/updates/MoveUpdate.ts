import { BaseUpdate } from '../BaseUpdate';

export interface MoveUpdate extends BaseUpdate {
    type: 'move';
    from: string;
    to: string;
    promotion?: 'Q' | 'R' | 'B' | 'N';
}
