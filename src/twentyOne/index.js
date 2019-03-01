import {shuffle} from '../deck'
import Player from './Player'
import Computer from './Computer'

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

export function* play () {
    const p1 = new Player({name: 'Player'});
    const p2 = new Computer({name: 'Computer'});
    const deck = shuffle();
    console.log(deck);
    let more = yield {
        player: {
            name: p1.name,
            cards: p1.cards,
            leftAmount: p1.leftAmount,
            score: p1.score
        },
        computer: {
            name: p2.name,
            cards: p2.cards,
            leftAmount: p2.leftAmount,
            score: p2.score
        }
    };

    let count = 0;
    do{
        count++;

        p1.more = more;
        p1.lr = p2.lr = false;

        if(p1.more) {
            p1.addCard(deck.pop());
        }

        p2.makeDecision() && p2.addCard(deck.pop());

        checkRoundWinner(p1, p2);

        more = yield {
            player: {
                cards: p1.cards,
                leftAmount: p1.leftAmount,
                score: p1.score
            },
            computer: {
                cards: p2.cards,
                leftAmount: p2.leftAmount,
                score: p2.score
            }
        };
    } while(p1.leftAmount !== 0 && p2.leftAmount !== 0 && count < MAX_ROUNDS);

}
