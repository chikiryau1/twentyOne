import Player from './Player'

export default class Computer extends Player{
    makeDecision(){
        this.checkCards();
        return this.sum() <= 17
    }
}