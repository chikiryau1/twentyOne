import {BET} from './config'

export default class Player{
    constructor(props) {
        const {name} = props;
        this.name = name;
        this._leftAmount = 100;
        this.cards = [];
    }

    get leftAmount() {
        return this._leftAmount
    }

    set leftAmount(v) {
        return v
    }

    lostRound(){
        this.leftAmount -= BET
    }

    wonRound(){
        this.leftAmount += BET
    }

    lostGame(){

    }

    wonGame(){

    }

    checkCards() {
        return this.cards.length <= 8
    }

    addCard(card){
        if(this.checkCards()){
            this.cards.push(card)
        }
    }
}
