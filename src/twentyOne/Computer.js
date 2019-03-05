import Player from './Player'

export default class Computer extends Player{
    makeDecision(){
        this.more = this.score <= 17;
        return this.score <= 17
    }
}