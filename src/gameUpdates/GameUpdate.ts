import { MoveUpdate } from './updates/MoveUpdate';
import { OfferDrawUpdate } from './updates/OfferDrawUpdate';
import { AcceptDrawUpdate } from './updates/AcceptDrawUpdate';
import { ForfeitUpdate } from './updates/ForfeitUpdate';
import { ChatUpdate } from './updates/ChatUpdate';

export type GameUpdate =
    MoveUpdate |
    ChatUpdate |
    OfferDrawUpdate |
    AcceptDrawUpdate |
    ForfeitUpdate;
