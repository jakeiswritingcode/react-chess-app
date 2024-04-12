import { BaseUpdate } from '../BaseUpdate';

export interface MoveUpdate extends BaseUpdate {
    type: 'move';
    from: string;
    to: string;
    promotion?: 'Queen' | 'Rook' | 'Bishop' | 'Knight';
}
