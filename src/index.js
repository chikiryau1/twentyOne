import {play} from './twentyOne'
import {forEach} from './lodash'
import Player from './twentyOne/Player';
import Computer from './twentyOne/Computer';

document.addEventListener('DOMContentLoaded', () => {

    const p1 = new Player({name: 'Player'});
    const p2 = new Computer({name: 'Computer'});
    const twentyOne = play(p1, p2);

    const {round, player, computer} = twentyOne.next().value;

    const deal = p1.deal();

    const roundNumber = document.querySelector('#round');
    const player1More = document.querySelector('#playerMore');
    const player1Hold = document.querySelector('#playerHold');
    const player1Info = document.querySelector('#playerInfo');
    const player1Status = document.querySelector('#playerStatus');
    const computerInfo = document.querySelector('#computerInfo');
    const computerStatus = document.querySelector('#computerStatus');

    moveCallback(round, player, computer);

    document.querySelector('#player .name').innerText = p1.name;
    document.querySelector('#computer .name').innerText = p2.name;


    function moveCallback(round, player, computer) {
        const {cards, leftAmount, score} = player;
        const {cards: ccards, leftAmount: cleftAmount, score: cscore} = computer;
        roundNumber.innerText = round;
        player1Info.innerHTML = renderCards(cards);
        player1Status.innerText = `left amount: ${leftAmount} \n score: ${score}`;
        computerInfo.innerHTML = renderCards(ccards);
        computerStatus.innerText = `left amount: ${cleftAmount}\n score: ${cscore}`;
    }

    player1More.addEventListener('click', () => {
        deal.next(true);
        const {round, player, computer} =  twentyOne.next(true).value;

        moveCallback(round, player, computer)
    });

    player1Hold.addEventListener('click', () => {
        deal.next(false);
        const {round, player, computer} =  twentyOne.next(false).value;
        moveCallback(round, player, computer)
    })
});


function renderCards (cards) {
    let str = ``;
    forEach(cards, card => {
        str += `<div class="card">${card.name} ${card.suit} <br/>Value: ${card.value} </div>`
    });
    return str
}