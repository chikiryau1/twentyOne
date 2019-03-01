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
    }

    lostRound(){
        this.lr = true;
        this.cards = [];
        this.leftAmount -= BET
    }

    wonRound(){
        this.lr = false;
        this.cards = [];
        this.leftAmount += BET
    }

    lostGame(){

    }

    wonGame(){

    }

    sum(){
        return reduce(this.cards, (res, v) => {
            res+=v.value;
            return res
        }, 0);
    }

    checkCards() {
        const sum = this.sum();
        if(sum > 21){
            this.lostRound();
            return false
        } else if(sum === 21) {
            this.wonRound()
        }
        return this.cards.length <= 8
    }

    addCard(card){
        if(this.checkCards()){
            const {suit, name} = getCardInfo(card);
            this.cards.push({
                suit,
                name,
                value: getCardCost(card)
            })
        }
    }
}
