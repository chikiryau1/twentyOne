import {shuffle} from '../deck'
import Player from './Player'
import Computer from './Computer'

const MAX_ROUNDS = 50;

export function* play () {
    const p1 = new Player({name: 'Donbass'});
    const p2 = new Computer({name: 'Hohol'});
    const deck = shuffle();

    let more = yield {
        player: {
            cards: p1.cards,
            leftAmount: p1.leftAmount,
            round: !p1.lr
        },
        computer: {
            cards: p2.cards,
            leftAmount: p2.leftAmount,
            round: !p2.lr
        }
    };

    let count = 0;
    do{
        count++;

        if(more) {
            p1.addCard(deck.pop());
            p1.checkCards()
        }

        if (p1.lr){
            p2.wonRound()
        } else {
            const d = p2.makeDecision();
            d && p2.addCard(deck.pop());

            if(p2.lr){
                p1.wonRound()
            }
        }

        if(!p1.lr && !p2.lr && !more && !p2.makeDecision()){
            p1.sum() >= p2.sum() ? (p1.wonRound() && p2.lostRound()) : (p2.wonRound() && p1.lostRound())
        }

        more = yield {
            player: {
                cards: p1.cards,
                leftAmount: p1.leftAmount,
                round: !p1.lr
            },
            computer: {
                cards: p2.cards,
                leftAmount: p2.leftAmount,
                round: !p2.lr
            }
        };
    } while(p1.leftAmount !== 0 && p2.leftAmount !== 0 && count < MAX_ROUNDS);

}
