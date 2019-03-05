import {forEach} from '../lodash'

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
}