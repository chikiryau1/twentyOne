import {shuffle} from '../deck'
import TwentyOne from './store'

const MAX_ROUNDS = 50;

const deck = shuffle();

export function* play (p1, p2) {
    const game = new TwentyOne(p1, p2);
    let more = yield game.roundStatus;
    let count = 0;
    do{
        count++;

        p1.more && p1.addCard(deck.pop());
        p2.makeDecision() && p2.addCard(deck.pop());
        if(!game.isMore()){
           game.endRound();
        }

        more = yield game.roundStatus
    } while(p1.leftAmount !== 0 && p2.leftAmount !== 0 && count < MAX_ROUNDS);
}
