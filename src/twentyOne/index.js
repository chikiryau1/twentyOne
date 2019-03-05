import {shuffle} from '../deck'
import Player from './Player'
import Computer from './Computer'
import TwentyOne from './store'

const MAX_ROUNDS = 50;

const checkRoundWinner = (p1, p2) => {
    const score1 = p1.score;
    const score2 = p2.score;

    console.log(p1.score);
    console.log(p2.score);
    if(score1 > 21 && score2 <= 21){
        p1.lostRound();
        p2.wonRound();
    } else if(score1 <= 21 && score2 > 21){
        p2.lostRound();
        p1.wonRound();
    } else if(!p1.more && !p2.more) {
        if(score1 > score2) {
            p2.lostRound();
            p1.wonRound();
        } else if(score1 < score2) {
            p1.lostRound();
            p2.wonRound();
        } else {
            p1.reset();
            p2.reset();
            console.log('DRAW');
        }
    }
};

export function* play (p1, p2) {
    const game = new TwentyOne(p1, p2);
    const deck = shuffle();
    let more = yield game.roundStatus;
    let count = 0;
    do{
        count++;

        p1.lr = p2.lr = false;

        p1.more && p1.addCard(deck.pop());
        p2.makeDecision() && p2.addCard(deck.pop());

        // checkRoundWinner(p1, p2);

        more = yield game.roundStatus
    } while(p1.leftAmount !== 0 && p2.leftAmount !== 0 && count < MAX_ROUNDS);

}
