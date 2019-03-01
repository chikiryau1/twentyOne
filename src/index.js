import {play} from './twentyOne'
import {forEach} from './lodash'

document.addEventListener('DOMContentLoaded', () => {
    const twentyOne = play();
    const {player, computer} = twentyOne.next().value;

    const player1More = document.querySelector('#playerMore');
    const player1Hold = document.querySelector('#playerHold');
    const player1Info = document.querySelector('#playerInfo');
    const player1Status = document.querySelector('#playerStatus');
    const computerInfo = document.querySelector('#computerInfo');
    const computerStatus = document.querySelector('#computerStatus');

    moveCallback(player, computer);

    document.querySelector('#player .name').innerText = player.name;
    document.querySelector('#computer .name').innerText = computer.name;


    function moveCallback(player, computer) {
        const {cards, leftAmount, score} = player;
        const {cards: ccards, leftAmount: cleftAmount, score: cscore} = computer;

        player1Info.innerHTML = renderCards(cards);
        player1Status.innerText = `left amount: ${leftAmount} \n score: ${score}`;
        computerInfo.innerHTML = renderCards(ccards);
        computerStatus.innerText = `left amount: ${cleftAmount}\n score: ${cscore}`;
    }

    player1More.addEventListener('click', () => {
        const {player, computer} =  twentyOne.next(true).value;
        moveCallback(player, computer)
    });

    player1Hold.addEventListener('click', () => {
        const {player, computer} =  twentyOne.next(false).value;
        moveCallback(player, computer)
    })
});


function renderCards (cards) {
    let str = ``;
    forEach(cards, card => {
        str += `<div class="card">${card.name} ${card.suit} <br/>Value: ${card.value} </div>`
    });
    return str
}