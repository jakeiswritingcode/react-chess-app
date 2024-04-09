import { MoveUpdate } from './updates/MoveUpdate';
import { ForfeitUpdate } from './updates/ForfeitUpdate';
import { ChatUpdate } from './updates/ChatUpdate';

export type GameUpdate =
    MoveUpdate |
    ForfeitUpdate |
    ChatUpdate;
