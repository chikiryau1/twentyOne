import {shuffle} from '../deck'
import Player from './Player'

const MAX_ROUNDS = 50;

export function* play () {
    const p1 = new Player('Donbass');
    const p2 = new Player('Hohol');
    const deck = shuffle();

    let res = yield {
        'Player1': p1.cards,
        'Player2': p2.cards
    };

    console.log(res);

    let count = 0;
    do{
        count++;
        res && p1.addCard(deck.pop());
        p2.addCard(deck.pop());

        res = yield {
            'Player1': p1.cards,
            'Player2': p2.cards
        };
    } while(p1.leftAmount !== 0 && p2.leftAmount !== 0 && count < MAX_ROUNDS);

}
