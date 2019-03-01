import {range, reduce} from './lodash'

const DECK = range(36);

const SUIT_MAP = {
    0: 'CLUBS', // крести
    1: 'HEARTS', // черви
    2: 'DIAMONDS', // бубны
    3: 'SPADES', // пики
};

const NAME_MAP = {
    0: 6,
    1: 7,
    2: 8,
    3: 9,
    4: 10,
    5: 'Jack',
    6: 'Queen',
    7: 'King',
    8: 'Ace',
};

export const getSuit = (num) => {
    const v = num / 9;
    return SUIT_MAP[v]
};

export const getName = (num) => {
    const v = num % 9;
    return NAME_MAP[v]
};

export const getCardInfo = (num) => {
    return {
        suit: getSuit(num),
        name: getName(num)
    }
};

export const shuffle = () => {
    const result = [...DECK];
    const {length: resLen} = result;
    reduce(DECK, (i, j) => {
        const rand = Math.floor(Math.random() * 2);
        if (rand) {
            i = i % resLen;
            result[j] = result[i];
            result[i] = j;
        }
        return ++i
    }, 1);
    return result
};

export default shuffle()
