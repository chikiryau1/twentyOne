import {forEach, reduce} from '../lodash'

export default class Game {
    constructor (...players) {
        this.players = players;
        this.round = 0;
    }

    get roundStatus () {
        const info = {
            round: this.round
        };
        forEach(this.players, player => {
            const {name, cards, leftAmount, score, more} = player;
            info[name.toLowerCase()] = {
                cards,
                leftAmount,
                score,
                more
            }
        });
        return info
    }

    checkRoundWinner () {
        return reduce(this.players, (max, player) => {
            const {score} = player;

            const normScore = score > 21 ? 0 : score;

            if(normScore === 0){
                player.more = false;

            } else {
                if(max.score === score) {
                    // потом
                }
            }

            return max.score > normScore ? max : player
        }, this.players[0])
    }

    isMore () {
        return reduce(this.players, (acc, player) => {
            if(player.more){
                return player.more
            }
            return acc
        }, false)
    }

    endRound(){
        const winner = this.checkRoundWinner();

        console.log('Round Winner: ', winner.name);
        console.log('score ', winner.score);

        forEach(this.players, player => {
            if(player !== winner) {
                player.lostRound()
            } else{
                player.wonRound()
            }
            player.more = true
        });
        this.round++;
    }
}