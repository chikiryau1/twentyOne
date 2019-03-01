import {play} from './twentyOne'
import {forEach} from './lodash'

document.addEventListener('DOMContentLoaded', () => {
    const twentyOne = play();
    twentyOne.next();
    const player1More = document.querySelector('#playerMore');
    const player1Hold = document.querySelector('#playerHold');
    const player1Info = document.querySelector('#playerInfo');
    const computerInfo = document.querySelector('#computerInfo');

    player1More.addEventListener('click', () => {
        const {player, computer} =  twentyOne.next(true).value;

        const {cards, leftAmount, round} = player;
        const {cards: ccards, leftAmount: cleftAmount, round: cround} = computer;
        player1Info.innerHTML = `${renderCards(cards)}\n left amount: ${leftAmount} \n WON: ${round}`;
        computerInfo.innerHTML = `${renderCards(ccards)}\n left amount: ${cleftAmount}\n WON: ${round}`;
    });

    player1Hold.addEventListener('click', () => {
        player1Info.innerText = twentyOne.next(false).value['Player1'];
    })
});

function renderCards (cards) {
    let str = ``;
    forEach(cards, card => {
        str += `<div class="card">${card.name} ${card.suit} <br/>Value: ${card.value} </div>`
    });
    return str
}