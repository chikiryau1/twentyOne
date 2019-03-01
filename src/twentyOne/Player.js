import {BET, COST_MAP} from './config'
import {reduce} from '../lodash'
import {getCardInfo} from '../deck'

export const getCardCost = (num) => {
    const v = num % 9;
    return COST_MAP[v]
};

export default class Player{
    constructor(props) {
        const {name} = props;
        this.name = name;
        this.leftAmount = 100;
        this.cards = [];
        this.more = true;
        this.score = 0;
    }

    lostRound(){
        console.log(this.name, ' LOST');
        this.reset();
        this.leftAmount -= BET;
    }

    wonRound(){
        console.log(this.name, ' WON');
        this.reset();
        this.leftAmount += BET;
    }

    reset () {
        this.lr = false;
        this.cards = [];
        this.more = true;
        this.score = 0;
    }

    sum(){
        return reduce(this.cards, (res, v) => {
            res+=v.value;
            return res
        }, 0);
    }

    checkCards() {
        return this.cards.length <= 8
    }

    addCard(card){
        this.score = this.sum();
        if(this.more && this.checkCards()){
            const {suit, name} = getCardInfo(card);
            this.cards.push({
                suit,
                name,
                value: getCardCost(card)
            });
            this.score = this.sum();
        }
    }
}
